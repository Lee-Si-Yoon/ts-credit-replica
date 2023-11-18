export const scaleCanvas = ({
  canvasRef,
}: {
  canvasRef: HTMLCanvasElement;
}) => {
  const dpr = window.devicePixelRatio;
  canvasRef.getContext('2d')?.scale(dpr, dpr);
};

export const setCanvasSize = ({
  canvasRef,
  containerRef,
}: {
  canvasRef: HTMLCanvasElement;
  containerRef: HTMLDivElement;
}) => {
  const dpr = window.devicePixelRatio;
  const { width, height } = containerRef.getBoundingClientRect();
  canvasRef.width = dpr * width;
  canvasRef.height = dpr * height;
};
