import React from 'react';
import { addEvent, removeEvent, touchy, type TouchyEvent } from './touchy';

export type DragDirections = 'left' | 'right' | 'idle';

export default function useThrottleTimeeDragDirection<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [isMouseDragging, setIsMouseDragging] = React.useState(false);
  const [dragDirection, setDragDirection] =
    React.useState<DragDirections>('idle');

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  React.useEffect(() => {
    const element = ref?.current ? ref.current : document;

    const handleMouseMove = (e: TouchyEvent) => {
      if (isMouseDown === true) {
        setIsMouseDragging(true);

        if (e.movementX > 0) {
          setDragDirection('right');
        } else if (e.movementX < 0) {
          setDragDirection('left');
        }
      }
    };

    touchy(element, addEvent, 'mousemove', handleMouseMove);
    touchy(element, addEvent, 'mousedown', handleMouseDown);

    return () => {
      touchy(element, removeEvent, 'mousemove', handleMouseMove);
      touchy(element, removeEvent, 'mousedown', handleMouseDown);
    };
  }, [isMouseDown]);

  return {
    ref,
    dragDirection,
    isMouseDragging,
    setIsMouseDown,
    setIsMouseDragging,
    setDragDirection,
  };
}
