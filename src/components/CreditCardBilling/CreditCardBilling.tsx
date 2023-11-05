import React from 'react';
import { scaleCanvas, setCanvasSize } from '@utils/canvas/canvasDimensions';
import { clearCanvas } from '@utils/canvas/clearCanvas';
import { css } from '@emotion/react';
import { pallete } from './colorPallete';
import { mockData } from './mockData';
import type { Sides, Size } from './types';

export type Category = 'shopping' | 'transfer' | 'food';

export interface CreditCardBilling {
  category: Category;
  value: number;
}

interface CreditCardBillingProps {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  data?: Record<'data', CreditCardBilling[]>;
  margin?: Sides;
}

const Container = css`
  position: relative;
  outline: none;
`;

const Canvas = css`
  position: absolute;
  pointerevents: none;
`;

// const roundRectRadii = 12;
const defaultMargins = {
  top: 40,
  bottom: 20,
  left: 20,
  right: 20,
};

export default function CreditCardBilling({
  data = mockData,
  width,
  height,
  margin = defaultMargins,
}: CreditCardBillingProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chartCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const popoverCanvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (
        chartCanvasRef.current !== null &&
        containerRef.current !== null &&
        popoverCanvasRef.current !== null
      ) {
        setCanvasSize({
          canvasRef: chartCanvasRef.current,
          containerRef: containerRef.current,
        });
        setCanvasSize({
          canvasRef: popoverCanvasRef.current,
          containerRef: containerRef.current,
        });
        scaleCanvas({ canvasRef: chartCanvasRef.current });
        scaleCanvas({ canvasRef: popoverCanvasRef.current });
        drawChart({
          data,
          canvasRef: chartCanvasRef.current,
          containerRef: containerRef.current,
          colorPallete: pallete,
          padding: 4,
          margin,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, margin]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current !== null && popoverCanvasRef.current !== null) {
        const selected = selectDatum({
          e,
          data,
          containerRef: containerRef.current,
          padding: 4,
          margin,
        });

        if (selected === null) {
          clearCanvas({
            container: containerRef.current,
            targetCanvas: popoverCanvasRef.current,
          });
        } else {
          drawPopover({
            selected,
            canvasRef: popoverCanvasRef.current,
            containerRef: containerRef.current,
          });
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [data, margin]);

  return (
    <div
      role="presentation"
      ref={containerRef}
      css={Container}
      style={{ width, height }}
    >
      <canvas ref={chartCanvasRef} css={Canvas} />
      <canvas ref={popoverCanvasRef} css={Canvas} />
    </div>
  );
}

interface CreditCardBillingWithCoords extends CreditCardBilling {
  x: { start: number; end: number };
  y: { start: number; end: number };
  percentage: number;
}

const getCoordinatesAndPercentages = ({
  data,
  xMax,
  yMax,
  margin = defaultMargins,
  padding = 4,
}: {
  data: CreditCardBilling[];
  xMax: number;
  yMax: number;
  margin?: Sides;
  padding?: number;
}) => {
  const withCoordinates: CreditCardBillingWithCoords[] = [];
  const accumulativeValue = data.reduce((a, c) => {
    return a + c.value;
  }, 0);
  const reRangedXMaxRatio =
    (xMax - margin.right - margin.left) / accumulativeValue;
  let rectStart = margin.left;

  data.forEach((datum, i) => {
    const isLast = i === data.length - 1;
    const paddingAdjustment = isLast ? 0 : padding / 2;
    const width =
      accumulativeValue * (datum.value / accumulativeValue) * reRangedXMaxRatio;
    const start = i === 0 ? rectStart : rectStart + padding / 2;
    const end = rectStart + width - paddingAdjustment;
    const percentage = parseFloat(
      ((datum.value / accumulativeValue) * 100).toFixed(1)
    );
    withCoordinates.push({
      ...datum,
      x: { start, end },
      y: {
        start: margin.top,
        end: yMax - margin.top - margin.bottom,
      },
      percentage,
    });
    rectStart = end + paddingAdjustment;
  });

  return withCoordinates;
};

const drawChart = ({
  canvasRef,
  containerRef,
  data,
  margin = defaultMargins,
  padding = 4,
  colorPallete = pallete,
}: {
  canvasRef: HTMLCanvasElement;
  containerRef: HTMLDivElement;
  data: Record<'data', CreditCardBilling[]>;
  margin?: Sides;
  padding?: number;
  colorPallete?: Record<string, React.CSSProperties['color']>;
}) => {
  const containerDimension = containerRef.getBoundingClientRect();
  const withCoordinates = getCoordinatesAndPercentages({
    data: data.data.sort((a, b) => {
      return b.value - a.value;
    }),
    xMax: containerDimension.width,
    yMax: containerDimension.height,
    padding,
    margin,
  });

  const ctx = canvasRef.getContext('2d');
  if (ctx === null) return;

  withCoordinates.forEach((datum, i) => {
    const { x, y } = datum;

    if (i === 0 || i === withCoordinates.length - 1) {
      ctx.fillStyle = `${colorPallete[datum.category]}`;
      ctx.fillRect(x.start, y.start, x.end - x.start, y.end);
    } else {
      ctx.fillStyle = `${pallete[datum.category]}`;
      ctx.fillRect(x.start, y.start, x.end - x.start, y.end);
    }
  });
};

const selectDatum = ({
  e,
  containerRef,
  data,
  padding,
  margin = defaultMargins,
}: {
  e: MouseEvent;
  containerRef: HTMLDivElement;
  data: Record<'data', CreditCardBilling[]>;
  padding: number;
  margin: Sides;
}) => {
  const containerDimension = containerRef.getBoundingClientRect();
  const withCoordinates = getCoordinatesAndPercentages({
    data: data.data.sort((a, b) => {
      return b.value - a.value;
    }),
    xMax: containerDimension.width,
    yMax: containerDimension.height,
    padding,
    margin,
  });
  const selectTarget = withCoordinates.find((datum) => {
    if (
      e.clientX >= datum.x.start &&
      e.clientX <= datum.x.end &&
      e.clientY - containerDimension.top >= datum.y.start &&
      e.clientY - containerDimension.top <= datum.y.start + datum.y.end
    ) {
      return true;
    }

    return false;
  });

  if (selectTarget !== undefined) {
    return selectTarget;
  } else {
    return null;
  }
};

const drawPopover = ({
  canvasRef,
  containerRef,
  selected,
  modalSize = { width: 50, height: 30 },
  triangleSize = { width: 20, height: 10 },
}: {
  canvasRef: HTMLCanvasElement;
  containerRef: HTMLDivElement;
  selected: CreditCardBillingWithCoords;
  modalSize?: Size;
  triangleSize?: Size;
}) => {
  clearCanvas({ container: containerRef, targetCanvas: canvasRef });
  const ctx = canvasRef.getContext('2d');
  if (ctx === null) return;
  const centerPoint = {
    x: selected.x.start + (selected.x.end - selected.x.start) / 2,
    y: selected.y.start + selected.y.end / 2,
  };
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 6;
  ctx.beginPath();
  ctx.moveTo(centerPoint.x, centerPoint.y);
  ctx.lineTo(
    centerPoint.x + triangleSize.width / 2,
    centerPoint.y + triangleSize.height
  );
  ctx.lineTo(
    centerPoint.x - triangleSize.width / 2,
    centerPoint.y + triangleSize.height
  );
  ctx.fill();
  ctx.fillRect(
    centerPoint.x - modalSize.width / 2,
    centerPoint.y + triangleSize.height,
    modalSize.width,
    modalSize.height
  );

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText(
    `${selected.percentage}%`,
    centerPoint.x,
    centerPoint.y + triangleSize.height + modalSize.height / 2
  );
};
