import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";

export function Poc2() {
  const [handlePosition, setHandlePosition] = useState(0);
  const [panPosition, setPanPosition] = useState("");
  const [draggingHandle, setDraggingHandle] = useState(false);
  const [assetPositions, setAssetPositions] = useState({
    hitboxAStart: 0,
    hitboxAEnd: 0,
    hitboxBStart: 0,
    hitboxBEnd: 0,
    panHandleCenter: 0,
    pathStart: 0,
    pathEnd: 0,
  });
  const [lastPlayedHitbox, setLastPlayedHitbox] = useState(null);
  const [score, setScore] = useState(0);
  const panHandleRef = useRef(null);
  const [previousTouchPosition, setPreviousTouchPosition] = useState(null);

  useEffect(() => {
    const currentPosition = assetPositions.panHandleCenter;

    if (currentPosition >= assetPositions.hitboxAStart && currentPosition <= assetPositions.hitboxAEnd) {
      setPanPosition("Hitbox A");
      if (lastPlayedHitbox !== "Hitbox A") {
        setTimeout(() => {
          playSound("beep");
        }, 100);
        setScore((prevScore) => prevScore + 5);
        setLastPlayedHitbox("Hitbox A");
      }
    } else if (currentPosition >= assetPositions.hitboxBStart && currentPosition <= assetPositions.hitboxBEnd) {
      setPanPosition("Hitbox B");
      if (lastPlayedHitbox !== "Hitbox B") {
        setTimeout(() => {
          playSound("beep");
        }, 100);
        setScore((prevScore) => prevScore + 5);
        setLastPlayedHitbox("Hitbox B");
      }
    } else if (currentPosition >= assetPositions.pathStart && currentPosition <= assetPositions.pathEnd) {
      setPanPosition("Path");
    } else {
      setPanPosition("None");
    }
  }, [assetPositions, lastPlayedHitbox]);

  useEffect(() => {
    const hitboxA = document.querySelector(".hitbox-a");
    const hitboxB = document.querySelector(".hitbox-b");
    const path = document.querySelector(".path");

    setAssetPositions((prevState) => ({
      ...prevState,
      hitboxAStart: hitboxA.getBoundingClientRect().left,
      hitboxAEnd: hitboxA.getBoundingClientRect().right,
      hitboxBStart: hitboxB.getBoundingClientRect().left,
      hitboxBEnd: hitboxB.getBoundingClientRect().right,
      pathStart: path.getBoundingClientRect().left,
      pathEnd: path.getBoundingClientRect().right,
    }));
  }, []);

  useEffect(() => {
    const panHandle = panHandleRef.current;
    if (panHandle) {
      const panHandleRect = panHandle.getBoundingClientRect();
      const panHandleCenter = (panHandleRect.left + panHandleRect.right) / 2;
      setAssetPositions((prevState) => ({ ...prevState, panHandleCenter }));
    }
  }, [handlePosition]);

  const handleMouseMove = (event) => {
    if (draggingHandle) {
      setHandlePosition((prevPosition) => prevPosition + event.movementY);
    }
  };

  const handleTouchMove = (event) => {
    if (draggingHandle) {
      event.preventDefault();
      const touch = event.targetTouches[0];

      if (previousTouchPosition !== null) {
        const touchMovement = touch.clientX - previousTouchPosition;
        setHandlePosition((prevPosition) => prevPosition + touchMovement);
      }

      setPreviousTouchPosition(touch.clientY);
    }
  };

  const StartDragPan = () => {
    setDraggingHandle(true);
  };

  const EndDragPan = () => {
    setDraggingHandle(false);
    setPreviousTouchPosition(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2 bg-success d-flex flex-column align-items-center p-5">
          <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} />
          <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} />
        </div>
        <div className="col-8 bg-light vh-100 d-flex flex-column align-items-center p-5">
          <progress className="progress" value={score} max={200} />
          <div className="box">
            <div className="hitbox-a" />
            <div className="path" />
            <div className="hitbox-b" />
          </div>

          <div className="table"></div>
        </div>
        <div className="col-2 bg-danger d-flex flex-column align-items-center p-5">
          <DraggableObject assetNames={["knife"]} isDraggableX={true} isDraggableY={true} />
        </div>
      </div>
    </div>
  );
}
