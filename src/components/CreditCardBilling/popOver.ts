import { canvasRoundRectPath } from '@utils/canvas/shapes/roundRect';
import { canvasTrianglePath } from '@utils/canvas/shapes/triangle';
import type { CreditCardBillingWithCoords } from './CreditCardBilling';
import type { Size } from './types';

export const drawPopover = ({
  canvasRef,
  selected,
  opacity,
  modalSize = { width: 50, height: 30 },
  triangleSize = { width: 20, height: 10 },
}: {
  canvasRef: HTMLCanvasElement;
  selected: CreditCardBillingWithCoords;
  opacity: number;
  modalSize?: Size;
  triangleSize?: Size;
}) => {
  const ctx = canvasRef.getContext('2d');
  // to separate shadow and filled paths clone the canvas and apply drawImage
  const detached = canvasRef.cloneNode() as HTMLCanvasElement;
  const detachedCtx = detached.getContext('2d');

  if (ctx === null || detachedCtx === null) return;

  ctx.globalAlpha = opacity;
  detachedCtx.globalAlpha = opacity;
  detachedCtx.fillStyle = 'white';

  const centerPoint = {
    x: selected.x.start + (selected.x.end - selected.x.start) / 2,
    y: selected.y.start + selected.y.end / 2,
  };
  canvasRoundRectPath({
    targetCanvas: detached,
    x: centerPoint.x - modalSize.width / 2,
    y: centerPoint.y + triangleSize.height,
    w: modalSize.width,
    h: modalSize.height,
    radius: {
      topLeft: 12,
      bottomLeft: 12,
      topRight: 12,
      bottomRight: 12,
    },
  });
  detachedCtx.fill();
  canvasTrianglePath({
    targetCanvas: detached,
    width: triangleSize.width,
    height: triangleSize.height,
    startCoord: centerPoint,
  });
  detachedCtx.fill();

  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 12;
  ctx.drawImage(detached, 0, 0);

  ctx.shadowBlur = 0;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(
    `${selected.percentage}%`,
    centerPoint.x,
    centerPoint.y + triangleSize.height + modalSize.height / 2
  );
};
