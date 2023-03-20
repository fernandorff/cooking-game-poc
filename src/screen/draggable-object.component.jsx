import React, { useState, useEffect, useRef } from "react";
import "./objects.css";

export function DraggableObject({
  assetNames,
  isDraggableX,
  isDraggableY,
  position = "relative",
  initialLeft = 0,
  initialTop = 0,
  width = "100%",
  onMove,
  scale = 1,
}) {
  const [objectPosition, setObjectPosition] = useState({
    x: initialLeft,
    y: initialTop,
  });
  const [isDragging, setIsDragging] = useState(false);
  const objectRefs = useRef([]);
  const [previousTouchPosition, setPreviousTouchPosition] = useState(null);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newPosition = {
        x: isDraggableX ? objectPosition.x + event.movementX : objectPosition.x,
        y: isDraggableY ? objectPosition.y + event.movementY : objectPosition.y,
      };
      setObjectPosition(newPosition);

      if (onMove && objectRefs.current[0]) {
        const rect = objectRefs.current[0].getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        onMove(centerX, centerY);
      }
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

      if (onMove && objectRefs.current[0]) {
        const rect = objectRefs.current[0].getBoundingClientRect();
        onMove(rect.left, rect.top);
      }
    }
  };

  const StartDrag = () => {
    setIsDragging(true);
  };

  const EndDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    objectRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.left = objectPosition.x + "px";
        ref.style.top = objectPosition.y + "px";
      }
    });
  }, [isDragging, objectPosition]);

  return (
    <>
      {assetNames.map((assetName, index) => (
        <div
          key={index}
          className={assetName + " draggable"}
          ref={(ref) => (objectRefs.current[index] = ref)}
          style={{
            position: position,
            left: initialLeft,
            top: initialTop,
            touchAction: "none",
            width: `${width}%`,
            zIndex: 5,
            transform: `scale(${scale})`,
            transition: "scale 0.1s ease-in-out",
          }}
          onMouseMove={index === assetNames.length - 1 ? handleMouseMove : null}
          onMouseDown={index === assetNames.length - 1 ? StartDrag : null}
          onMouseUp={index === assetNames.length - 1 ? EndDrag : null}
          onMouseLeave={index === assetNames.length - 1 ? EndDrag : null}
          onTouchMove={index === assetNames.length - 1 ? handleTouchMove : null}
          onTouchStart={index === assetNames.length - 1 ? StartDrag : null}
          onTouchEnd={index === assetNames.length - 1 ? EndDrag : null}
        />
      ))}
    </>
  );
}
