interface Radii {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

interface RoundRectProps {
  targetCanvas: HTMLCanvasElement;
  x: number;
  y: number;
  w: number;
  h: number;
  radius: Radii;
}

export const canvasRoundRectPath = ({
  targetCanvas,
  x,
  y,
  w,
  h,
  radius,
}: RoundRectProps) => {
  const ctx = targetCanvas.getContext('2d');
  if (ctx === null) return;
  const r = x + w;
  const b = y + h;
  ctx.beginPath();
  ctx.moveTo(x + radius.topLeft, y);
  ctx.lineTo(r - radius.topRight, y);
  ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
  ctx.lineTo(r, y + h - radius.bottomRight);
  ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
  ctx.lineTo(x + radius.bottomLeft, b);
  ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
  ctx.lineTo(x, y + radius.topLeft);
  ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
  ctx.closePath();
};
