import React, { useState, useRef, useEffect } from "react";
import { DraggableObject } from "./draggable-object.component";
import "./draggable-object.css";

export function SliceableObject({ assetName, position = "absolute", initialLeft = 0, initialTop = 0, width = "100%" }) {
  const [slicedCount, setSlicedCount] = useState(0);
  const [slices, setSlices] = useState([]);
  const [isSliceAnimating, setIsSliceAnimating] = useState(false);
  const [squareSides, setSquareSides] = useState({
    redLeft: 0,
    redRight: 0,
    redTop: 0,
    redBottom: 0,
    blueLeft: 0,
    blueRight: 0,
    blueTop: 0,
    blueBottom: 0,
  });
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const objectRef = useRef(null);
  const redSquareRef = useRef(null);
  const blueSquareRef = useRef(null);
  const [sliceSequence, setSliceSequence] = useState(0);

  useEffect(() => {
    const updateSquareSides = () => {
      if (redSquareRef.current && blueSquareRef.current) {
        const redRect = redSquareRef.current.getBoundingClientRect();
        const blueRect = blueSquareRef.current.getBoundingClientRect();
        setSquareSides({
          redLeft: redRect.left,
          redRight: redRect.right,
          redTop: redRect.top,
          redBottom: redRect.bottom,
          blueLeft: blueRect.left,
          blueRight: blueRect.right,
          blueTop: blueRect.top,
          blueBottom: blueRect.bottom,
        });
      }
    };
    updateSquareSides();
  }, []);

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

  useEffect(() => {
    const checkKnifePosition = () => {
      const { x, y } = knifePosition;
      const { redLeft, redRight, redTop, redBottom, blueLeft, blueRight, blueTop, blueBottom } = squareSides;
      console.log(redLeft, redRight, redTop, blueBottom);

      if (sliceSequence === 0 && y > redTop && y < redBottom && x > redLeft && x < redRight) {
        setSliceSequence(1);
      } else if (sliceSequence === 1 && y > redTop && y < redBottom && x > redLeft && x < redRight) {
        setSliceSequence(2);
      } else if (sliceSequence === 2 && y > blueTop && y < blueBottom && x > blueLeft && x < blueRight) {
        setSliceSequence(3);
      } else if (sliceSequence === 3 && y > blueTop && y < blueBottom && x > blueLeft && x < blueRight) {
        handleSlice();
        setSliceSequence(0);
      } else if (y < redTop || y > blueBottom || x < redLeft || x > redRight) {
        setSliceSequence(0);
      }
    };

    checkKnifePosition();
  }, [knifePosition]);

  useEffect(() => {
    console.log(sliceSequence);
  }, [sliceSequence]);

  const onDraggableMove = (x, y) => {
    setKnifePosition({ x, y });
  };

  return (
    <div style={{ position: "relative", display: "inline-block", width: "100%", height: "100%" }}>
      <div
        className={assetName + " draggable"}
        ref={objectRef}
        style={{
          position: position,
          left: initialLeft,
          top: initialTop,
          touchAction: "none",
          width: `${width}%`,
          clipPath: `inset(0 ${slicedCount * 20}% 0 0)`,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          transition: "all 0.5s ease-in-out",
        }}
      >
        <div
          ref={redSquareRef}
          style={{
            backgroundColor: "red",
            width: "20%",
            height: "20%",
            position: "absolute",
            top: "0",
          }}
        />
        <div
          ref={blueSquareRef}
          style={{
            backgroundColor: "blue",
            width: "20%",
            height: "20%",
            position: "absolute",
            bottom: "0",
          }}
        />
      </div>
      {slices.map((slice) => (
        <div
          key={slice.id}
          className={assetName + "-slice draggable"}
          style={{
            position: position,
            left: initialLeft,
            width: `${width * 0.8}%`,
            zIndex: 2,
            top: "50%",
            transform: isSliceAnimating ? `translate(0, -50%)` : `translate(+${100 - 20 * slice.id}%, -50%)`,
            opacity: isSliceAnimating ? 0 : 1,
            transition: "all 0.5s ease-in-out",
          }}
        />
      ))}
      <p>
        {squareSides.redLeft}, {squareSides.redRight}
      </p>
      <DraggableObject
        assetNames={["knife-blade", "knife-handle"]}
        isDraggableX={true}
        isDraggableY={true}
        width={10}
        onMove={onDraggableMove}
      />
    </div>
  );
}
