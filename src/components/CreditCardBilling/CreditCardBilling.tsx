import React from 'react';
import { scaleCanvas, setCanvasSize } from '@utils/canvas/canvasDimensions';
import { css } from '@emotion/react';
import { pallete } from './colorPallete';
import { mockData } from './mockData';

export type Category = 'shopping' | 'transfer' | 'food';

export interface CreditCardBilling {
  category: Category;
  value: number;
}

interface CreditCardBillingProps {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  data?: Record<'data', CreditCardBilling[]>;
}

const Container = css`
  position: relative;
  outline: none;
`;

const Canvas = css`
  position: absolute;
  pointerevents: none;
`;

const roundRectRadii = 12;

export default function CreditCardBilling({
  data = mockData,
  width,
  height,
}: CreditCardBillingProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [selectedDatum, setSelectedDatum] =
    React.useState<CreditCardBilling | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current !== null && containerRef.current !== null) {
        setCanvasSize({
          canvasRef: canvasRef.current,
          containerRef: containerRef.current,
        });
        scaleCanvas({ canvasRef: canvasRef.current });
        drawChart({
          data,
          canvasRef: canvasRef.current,
          containerRef: containerRef.current,
          colorPallete: pallete,
          padding: 4,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current !== null) {
        selectDatum({
          e,
          data,
          containerRef: containerRef.current,
          padding: 4,
          setter: setSelectedDatum,
        });
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [data]);

  React.useEffect(() => {
    console.log(selectedDatum);
  }, [selectedDatum]);

  return (
    <div
      role="presentation"
      ref={containerRef}
      css={Container}
      style={{ width, height }}
    >
      <canvas ref={canvasRef} css={Canvas} />
    </div>
  );
}

interface CreditCardBillingWithCoords extends CreditCardBilling {
  x: { start: number; end: number };
  height: number;
  percentage: number;
}

const getCoordinatesAndPercentages = ({
  data,
  xMax,
  yMax,
  padding = 4,
}: {
  data: CreditCardBilling[];
  xMax: number;
  yMax: number;
  padding: number;
}) => {
  const withCoordinates: CreditCardBillingWithCoords[] = [];
  const accumulativeValue = data.reduce((a, c) => {
    return a + c.value;
  }, 0);
  const reRangedXMax = xMax / accumulativeValue;
  let rectStart = 0;

  data.forEach((datum, i) => {
    const isLast = i === data.length - 1;
    const paddingAdjustment = isLast ? 0 : padding / 2;
    const width =
      accumulativeValue * (datum.value / accumulativeValue) * reRangedXMax;
    const start = i === 0 ? rectStart : rectStart + padding / 2;
    const end = rectStart + width - paddingAdjustment;
    withCoordinates.push({
      ...datum,
      x: { start, end },
      height: yMax,
      percentage: parseFloat(
        ((datum.value / accumulativeValue) * 100).toFixed(1)
      ),
    });
    rectStart = end + paddingAdjustment;
  });

  return withCoordinates;
};

const drawChart = ({
  canvasRef,
  containerRef,
  data,
  padding = 4,
  colorPallete,
}: {
  canvasRef: HTMLCanvasElement;
  containerRef: HTMLDivElement;
  data: Record<'data', CreditCardBilling[]>;
  padding?: number;
  colorPallete: Record<string, React.CSSProperties['color']>;
}) => {
  const containerDimension = containerRef.getBoundingClientRect();
  const withCoordinates = getCoordinatesAndPercentages({
    data: data.data.sort((a, b) => {
      return b.value - a.value;
    }),
    padding,
    xMax: containerDimension.width,
    yMax: containerDimension.height,
  });

  const ctx = canvasRef.getContext('2d');
  if (ctx === null) return;

  withCoordinates.forEach((datum, i) => {
    const { x, height } = datum;
    ctx.save();

    if (i === 0 || i === withCoordinates.length - 1) {
      ctx.roundRect(x.start, 0, x.end - x.start, height, [
        i === 0 ? roundRectRadii : 0,
        i === withCoordinates.length - 1 ? roundRectRadii : 0,
        i === withCoordinates.length - 1 ? roundRectRadii : 0,
        i === 0 ? roundRectRadii : 0,
      ]);
      // FIXME: fillStyle does not apply differently on every traversal
      ctx.fillStyle = `${colorPallete[datum.category]}`;
      ctx.fill();
    } else {
      ctx.fillStyle = `${pallete[datum.category]}`;
      ctx.fillRect(x.start, 0, x.end - x.start, height);
    }

    ctx.restore();
  });
};

const selectDatum = ({
  e,
  containerRef,
  data,
  padding,
  setter,
}: {
  e: MouseEvent;
  containerRef: HTMLDivElement;
  data: Record<'data', CreditCardBilling[]>;
  padding: number;
  setter: (value: CreditCardBilling | null) => void;
}) => {
  const containerDimension = containerRef.getBoundingClientRect();
  const withCoordinates = getCoordinatesAndPercentages({
    data: data.data.sort((a, b) => {
      return b.value - a.value;
    }),
    xMax: containerDimension.width,
    yMax: containerDimension.height,
    padding,
  });
  const selectTarget = withCoordinates.find((datum) => {
    if (
      e.clientX >= datum.x.start &&
      e.clientX <= datum.x.end &&
      e.clientY <= containerDimension.top + datum.height &&
      e.clientY >= containerDimension.top
    ) {
      return true;
    }

    return false;
  });

  if (selectTarget !== undefined) {
    setter(selectTarget);
  } else {
    setter(null);
  }
};
