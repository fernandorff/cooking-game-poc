import React, { useState, useEffect, useRef } from "react";
import "./draggable-object.css";

export function DraggableObject({
  assetNames,
  isDraggableX,
  isDraggableY,
  position = "relative",
  initialLeft = 0,
  initialTop = 0,
}) {
  const [objectPosition, setObjectPosition] = useState({
    x: initialLeft,
    y: initialTop,
  });
  const [isDragging, setIsDragging] = useState(false);
  const objectRef = useRef(null);
  const [previousTouchPosition, setPreviousTouchPosition] = useState(null);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newPosition = {
        x: isDraggableX ? objectPosition.x + event.movementX : objectPosition.x,
        y: isDraggableY ? objectPosition.y + event.movementY : objectPosition.y,
      };
      requestAnimationFrame(() => setObjectPosition(newPosition));
    }
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      event.preventDefault();
      const touch = event.targetTouches[0];

      if (previousTouchPosition !== null) {
        const touchMovementX = touch.clientX - previousTouchPosition.x;
        const touchMovementY = touch.clientY - previousTouchPosition.y;

        setObjectPosition((prevPosition) => ({
          x: isDraggableX ? prevPosition.x + touchMovementX : prevPosition.x,
          y: isDraggableY ? prevPosition.y + touchMovementY : prevPosition.y,
        }));
      }

      setPreviousTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const StartDrag = () => {
    setIsDragging(true);
  };

  const EndDrag = () => {
    setIsDragging(false);
    setPreviousTouchPosition(null);
  };

  return (
    <>
      {assetNames.map((assetName, index) => (
        <div
          key={index}
          className={assetName + " draggable"}
          ref={index === assetNames.length - 1 ? objectRef : null}
          style={{
            position: position,
            left: index === assetNames.length - 1 ? objectPosition.x : initialLeft,
            top: index === assetNames.length - 1 ? objectPosition.y : initialTop,
            touchAction: "none",
          }}
          onMouseMove={index === assetNames.length - 1 ? handleMouseMove : null}
          onMouseDown={index === assetNames.length - 1 ? StartDrag : null}
          onTouchMove={index === assetNames.length - 1 ? handleTouchMove : null}
          onTouchStart={index === assetNames.length - 1 ? StartDrag : null}
          onMouseUp={index === assetNames.length - 1 ? EndDrag : null}
          onMouseLeave={index === assetNames.length - 1 ? EndDrag : null}
          onTouchEnd={index === assetNames.length - 1 ? EndDrag : null}
        />
      ))}
    </>
  );
}
