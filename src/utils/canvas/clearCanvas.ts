export const clearCanvas = ({
  container,
  targetCanvas,
}: {
  container: HTMLDivElement;
  targetCanvas: HTMLCanvasElement;
}) => {
  const ctx = targetCanvas.getContext('2d');
  const dimensions = container.getBoundingClientRect();

  if (ctx !== null) {
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
  }
};
