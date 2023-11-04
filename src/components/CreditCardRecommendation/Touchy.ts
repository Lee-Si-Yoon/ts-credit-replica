/* eslint-disable @typescript-eslint/ban-types */
export function addEvent(
  element: EventTarget,
  type: string,
  fn: EventListener,
  capturing?: boolean
) {
  return element.addEventListener(type, fn, capturing);
}

export function removeEvent(
  element: EventTarget,
  type: string,
  fn: EventListener,
  capturing?: boolean
) {
  return element.removeEventListener(type, fn, capturing);
}

const touch = {
  mouseup: 'touchend',
  mouseleave: 'touchend',
  mousedown: 'touchstart',
  mousemove: 'touchmove',
};

type MouseType = 'mouseup' | 'mouseleave' | 'mousedown' | 'mousemove';

export type TouchyEvent = MouseEvent & TouchEvent;

export function touchy(
  element: EventTarget,
  event: Function,
  type: MouseType,
  fn: (evt: TouchyEvent) => void
) {
  event(element, touch[type], fn);
  event(element, type, fn);
}
