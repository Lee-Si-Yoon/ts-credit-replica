export function lerpRanges(
  value: number,
  range1Start: number,
  range1End: number,
  range2Start: number,
  range2End: number
) {
  const ratio = (value - range1Start) / (range1End - range1Start);

  return range2Start + (range2End - range2Start) * ratio;
}
