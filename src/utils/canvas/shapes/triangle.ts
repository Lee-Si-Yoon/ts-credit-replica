import type { Coord } from '@components/CreditCardBilling/types';

interface TriangleProps {
  targetCanvas: HTMLCanvasElement;
  width: number;
  height: number;
  startCoord: Coord;
}

// TODO: extend with directions
export const canvasTrianglePath = ({
  targetCanvas,
  width,
  height,
  startCoord,
}: TriangleProps) => {
  const ctx = targetCanvas.getContext('2d');
  if (ctx === null) return;
  ctx.beginPath();
  ctx.moveTo(startCoord.x, startCoord.y);
  ctx.lineTo(startCoord.x + width / 2, startCoord.y + height);
  ctx.lineTo(startCoord.x - width / 2, startCoord.y + height);
  ctx.closePath();
};
