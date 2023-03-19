import React, { useState, useRef, useEffect } from "react";
import { DraggableObject } from "./draggable-object.component";
import "./draggable-object.css";
import { playSound } from "../../helpers/playSound";

export function SliceableObject({
  assetName,
  position = "absolute",
  initialLeft = "0px",
  initialTop = "0px",
  width = "100%",
  amount = 2,
  interactionTimes = 4,
}) {
  const [slices, setSlices] = useState([]);
  const [isSliceAnimating, setIsSliceAnimating] = useState(false);
  const [hitBoxSides, setHitBoxSides] = useState({
    hitBoxLeft: 0,
    hitBoxRight: 0,
    hitBoxTop: 0,
    hitBoxBottom: 0,
  });
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const objectRef = useRef(null);
  const hitBoxRef = useRef(null);
  const [sliceSequence, setSliceSequence] = useState(0);
  const [ingredientAmount, setIngredientAmount] = useState(amount);

  useEffect(() => {
    const onTransitionEnd = () => {
      const hitBoxRect = hitBoxRef.current.getBoundingClientRect();
      setHitBoxSides({
        hitBoxLeft: hitBoxRect.left,
        hitBoxRight: hitBoxRect.right,
        hitBoxTop: hitBoxRect.top,
        hitBoxBottom: hitBoxRect.bottom,
      });
    };

    if (hitBoxRef.current) {
      hitBoxRef.current.addEventListener("transitionend", onTransitionEnd);
      onTransitionEnd();
    }

    return () => {
      if (hitBoxRef.current) {
        hitBoxRef.current.removeEventListener("transitionend", onTransitionEnd);
      }
    };
  }, [slices]);

  useEffect(() => {
    const checkKnifePosition = () => {
      const { x, y } = knifePosition;
      const { hitBoxLeft, hitBoxRight, hitBoxTop, hitBoxBottom } = hitBoxSides;

      if (sliceSequence === 0 && y > hitBoxTop && y < hitBoxTop + 5 && x > hitBoxLeft && x < hitBoxRight) {
        setSliceSequence(1);
      } else if (sliceSequence === 1 && y > hitBoxBottom - 5 && y < hitBoxBottom && x > hitBoxLeft && x < hitBoxRight) {
        handleSlice();
        setSliceSequence(0);
      } else if (sliceSequence === 1 && (y < hitBoxTop || y > hitBoxBottom || x < hitBoxLeft || x > hitBoxRight)) {
        setSliceSequence(0);
      }
    };

    checkKnifePosition();
  }, [knifePosition]);

  useEffect(() => {
    console.log("sliceSequence", sliceSequence);
  }, [sliceSequence]);

  useEffect(() => {
    console.log("hitBoxSides", hitBoxSides);
  }, [hitBoxSides]);

  useEffect(() => {
    console.log("ingredientAmount", ingredientAmount);
  }, [ingredientAmount]);

  useEffect(() => {
    if (slices.length === interactionTimes) {
      setIngredientAmount((prevIngredientAmount) => prevIngredientAmount - 1);
      playSound("success", 0.2);
    }
  }, [slices]);

  useEffect(() => {
    if (slices.length === interactionTimes && ingredientAmount - 1 > 0) {
      setSlices([]);
    }
  }, [slices]);

  const handleSlice = () => {
    setSlices((prevSlices) => [
      ...prevSlices,
      {
        id: slices.length,
        left: objectRef.current.offsetWidth - objectRef.current.offsetWidth * 0.2 * (slices.length + 1),
      },
    ]);
    setIsSliceAnimating(true);
    playSound("slice", 0.2);
    setTimeout(() => setIsSliceAnimating(false), 50);
  };

  const onDraggableMove = (x, y) => {
    setKnifePosition({ x, y });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        className={assetName}
        ref={objectRef}
        style={{
          position: "absolute",
          left: initialLeft,
          touchAction: "none",
          width: `${width}%`,
          clipPath: `inset(0 ${(slices.length * 100) / interactionTimes}% 0 0)`,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          transition: "all 0.5s ease-in-out",
        }}
      >
        <div
          ref={hitBoxRef}
          style={{
            backgroundColor: "#00000050",
            border: "dotted 2px black",
            borderTopColor: sliceSequence === 1 ? "#ffffff50" : "black",
            borderTopWidth: sliceSequence === 1 ? `${knifePosition.y - hitBoxSides.hitBoxTop}px` : 2,
            borderTopStyle: "solid",
            width: `${100 / interactionTimes}%`,
            height: "100%",
            position: "absolute",
            top: "0",
            right: `${(100 / interactionTimes) * slices.length}%`,
            transition: "right 0.5s ease-in-out",
          }}
        />
      </div>
      {slices.map((slice) => (
        <div
          key={slice.id}
          className={assetName + "-slice"}
          style={{
            position: "absolute",
            left: initialLeft,
            width: `${width * 0.8}%`,
            zIndex: 2,
            top: "50%",
            transform: isSliceAnimating
              ? `translate(0, -50%)`
              : `translate(+${120 - (100 / interactionTimes) * slice.id}%, -50%)`,
            opacity: isSliceAnimating ? 0 : 1,
            transition: "all 0.5s ease-in-out",
          }}
        />
      ))}
      <DraggableObject
        assetNames={["knife"]}
        isDraggableX={true}
        isDraggableY={true}
        width={3}
        onMove={onDraggableMove}
      />

      <div
        className={assetName + " d-flex justify-content-center align-items-center"}
        style={{
          position: "fixed",
          width: `100px`,
          zIndex: 3,
          top: 0,
          right: 0,
        }}
      >
        <h2>{ingredientAmount}</h2>
      </div>
    </div>
  );
}
