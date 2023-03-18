import React, { useState, useRef } from "react";
import "./draggable-object.css";

export function SliceableObject({ assetName, position = "absolute", initialLeft = 0, initialTop = 0, width = "100%" }) {
  const [objectPosition] = useState({
    x: initialLeft,
    y: initialTop,
  });
  const [slicedCount, setSlicedCount] = useState(0);
  const [slices, setSlices] = useState([]);
  const [isSliceAnimating, setIsSliceAnimating] = useState(false);

  const objectRef = useRef(null);

  const handleSlice = () => {
    setSlicedCount((prevSlicedCount) => prevSlicedCount + 1);
    setSlices((prevSlices) => [
      ...prevSlices,
      {
        id: slicedCount,
        left: objectRef.current.offsetWidth - objectRef.current.offsetWidth * 0.2 * (slicedCount + 1),
      },
    ]);
    setIsSliceAnimating(true);
    setTimeout(() => setIsSliceAnimating(false), 50);
  };

  return (
    <div style={{ position: "relative", display: "inline-block", width: "100%", height: "100%" }}>
      <div
        className={assetName + " draggable"}
        ref={objectRef}
        style={{
          position: position,
          left: objectPosition.x,
          top: objectPosition.y,
          touchAction: "none",
          width: `${width}%`,
          clipPath: `inset(0 ${slicedCount * 20}% 0 0)`,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          transition: "all 0.5s ease-in-out",
        }}
        onClick={handleSlice}
      />
      {slices.map((slice) => (
        <div
          key={slice.id}
          className={assetName + "-slice draggable"}
          style={{
            position: position,
            left: objectPosition.x,
            top: objectPosition.y,
            width: `${width * 0.8}%`,
            zIndex: 2,
            top: "50%",
            transform: isSliceAnimating ? `translate(0, -50%)` : `translate(+${100 - 20 * slice.id}%, -50%)`,
            opacity: isSliceAnimating ? 0 : 1,
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
