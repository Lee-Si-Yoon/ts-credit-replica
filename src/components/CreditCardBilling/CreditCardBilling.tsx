import React from 'react';
import { scaleCanvas, setCanvasSize } from '@utils/canvas/canvasDimensions';
import { clearCanvas } from '@utils/canvas/clearCanvas';
import { canvasRoundRectPath } from '@utils/canvas/shapes/roundRect';
import { css } from '@emotion/react';
import { pallete } from './colorPallete';
import { mockData } from './mockData';
import { drawPopover } from './popOver';
import type { Sides } from './types';

export type Category = 'shopping' | 'transfer' | 'food';

export interface CreditCardBilling {
  category: Category;
  value: number;
}

export interface CreditCardBillingWithCoords extends CreditCardBilling {
  x: { start: number; end: number };
  y: { start: number; end: number };
  percentage: number;
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

const roundRectRadii = 6;
const defaultMargins = {
  top: 40,
  bottom: 40,
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
  const popoverRAFID = React.useRef<number>(0);

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
          const popoverDuration = 500;
          const popoverAnimationStart = performance.now();

          const animatePopover = (timeStamp: number) => {
            const elapsed = timeStamp - popoverAnimationStart;
            const progress = Math.min(elapsed / popoverDuration, 1);
            const opacity = progress > 0 ? progress : 0;

            if (
              containerRef.current !== null &&
              popoverCanvasRef.current !== null
            ) {
              clearCanvas({
                container: containerRef.current,
                targetCanvas: popoverCanvasRef.current,
              });
              drawPopover({
                canvasRef: popoverCanvasRef.current,
                selected,
                opacity,
              });
            }

            if (progress < 1) {
              requestAnimationFrame(animatePopover);
            } else {
              cancelAnimationFrame(popoverRAFID.current);
            }
          };

          popoverRAFID.current = requestAnimationFrame(animatePopover);
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(popoverRAFID.current);
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
      canvasRoundRectPath({
        targetCanvas: canvasRef,
        x: x.start,
        y: y.start,
        w: x.end - x.start,
        h: y.end,
        radius: {
          topLeft: i === 0 ? roundRectRadii : 0,
          bottomLeft: i === 0 ? roundRectRadii : 0,
          topRight: i === withCoordinates.length - 1 ? roundRectRadii : 0,
          bottomRight: i === withCoordinates.length - 1 ? roundRectRadii : 0,
        },
      });
      ctx.fill();
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

  return selectTarget !== undefined ? selectTarget : null;
};
