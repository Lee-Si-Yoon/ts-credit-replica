import React from 'react';
import { addEvent, removeEvent, touchy, type TouchyEvent } from './Touchy';

export type DragDirections = 'left' | 'right' | 'idle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UseDragDirection<T extends HTMLElement = any>() {
  const ref = React.useRef<T>();

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
