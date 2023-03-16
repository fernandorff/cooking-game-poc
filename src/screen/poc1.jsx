import React, { useState, useEffect, useRef } from "react";
import "./poc1.css";
import { playSound } from "./../helpers/playSound";

export function Poc1() {
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
        playSound("beep");
        setScore((prevScore) => prevScore + 5);
        setLastPlayedHitbox("Hitbox A");
      }
    } else if (currentPosition >= assetPositions.hitboxBStart && currentPosition <= assetPositions.hitboxBEnd) {
      setPanPosition("Hitbox B");
      if (lastPlayedHitbox !== "Hitbox B") {
        playSound("beep");
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
      setHandlePosition((prevPosition) => prevPosition + event.movementX);
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

      setPreviousTouchPosition(touch.clientX);
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
    <div
      className="poc1"
      onMouseMove={handleMouseMove}
      onMouseUp={EndDragPan}
      onTouchMove={handleTouchMove}
      onTouchEnd={EndDragPan}
      onTouchStart={StartDragPan}
      style={{ touchAction: "none" }}
    >
      <progress className="progress" value={score} max={200} />
      <div className="pan" style={{ transform: `translateX(${handlePosition}px)` }} />
      <div
        className="pan-handle"
        ref={panHandleRef}
        style={{ transform: `translate(${handlePosition}px, 0)` }}
        onMouseDown={StartDragPan}
        onTouchStart={StartDragPan}
      />
      <div className="box">
        <div className="hitbox-a" />
        <div className="path" />
        <div className="hitbox-b" />
      </div>
      <p className="paragraph">
        Current X position of the center of the pan-handle: {assetPositions.panHandleCenter}px
      </p>
      <p className="paragraph">Panhandle center is within: {panPosition}</p>
    </div>
  );
}
