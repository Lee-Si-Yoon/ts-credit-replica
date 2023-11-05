import React from 'react';
import { scaleCanvas, setCanvasSize } from '@utils/canvas/canvasDimensions';
import { css } from '@emotion/react';
import { amber, indigo, tomato } from '@radix-ui/colors';

type Category = 'shopping' | 'transfer' | 'food';

interface CreditCardBilling {
  category: Category;
  value: number;
}

const mockData: Record<'data', CreditCardBilling[]> = {
  data: [
    { category: 'shopping', value: 791 },
    { category: 'transfer', value: 216 },
    { category: 'food', value: 450 },
  ],
};

type CreditCardBillingPallete = {
  [key in Category]: React.CSSProperties['color'];
};

const pallete: CreditCardBillingPallete = {
  shopping: tomato.tomato9,
  transfer: indigo.indigo9,
  food: amber.amber9,
};

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

  React.useLayoutEffect(() => {
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
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  return (
    <div ref={containerRef} css={Container} style={{ width, height }}>
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
