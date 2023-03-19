import React, { useState, useRef, useEffect } from "react";
import "./objects.css";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";

export function DiceIngredient({
  assetName,
  position = "absolute",
  initialLeft = "0px",
  initialTop = "0px",
  width = "100%",
  amount = 2,
  interactionTimes = 4,
}) {
  const [dices, setDices] = useState([]);
  const [isDiceAnimating, setIsDiceAnimating] = useState(false);
  const [hitBoxSides, setHitBoxSides] = useState({
    hitBoxLeft: 0,
    hitBoxRight: 0,
    hitBoxTop: 0,
    hitBoxBottom: 0,
  });
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const objectRef = useRef(null);
  const hitBoxRef = useRef(null);
  const [diceSequence, setDiceSequence] = useState(0);
  const [ingredientAmount, setIngredientAmount] = useState(amount);
  const [clickCount, setClickCount] = useState(0);
  const [knifeScale, setKnifeScale] = useState(1);

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
  }, [dices]);

  useEffect(() => {
    const checkKnifePosition = () => {
      const { x, y } = knifePosition;
      const { hitBoxLeft, hitBoxRight, hitBoxTop, hitBoxBottom } = hitBoxSides;

      if (x > hitBoxLeft && x < hitBoxRight && y > hitBoxTop && y < hitBoxBottom) {
        setDiceSequence(1);
      } else {
        setDiceSequence(0);
      }
    };

    checkKnifePosition();
  }, [knifePosition]);

  useEffect(() => {
    if (dices.length === interactionTimes) {
      setIngredientAmount((prevIngredientAmount) => prevIngredientAmount - 1);
      playSound("success", 0.2);
    }
  }, [dices]);

  useEffect(() => {
    if (dices.length === interactionTimes && ingredientAmount - 1 > 0) {
      setDices([]);
    }
  }, [dices]);

  useEffect(() => {
    console.log("diceSequence", diceSequence);
  }, [diceSequence]);

  useEffect(() => {
    console.log("clickCount", clickCount);
  }, [clickCount]);

  const onKnifeClick = (event) => {
    event.stopPropagation();
    setKnifeScale(0.8);
    setTimeout(() => setKnifeScale(1), 100);
    if (diceSequence === 1) {
      setClickCount((prevClickCount) => prevClickCount + 1);
      playSound("chop", 0.2);

      if (clickCount >= 9) {
        handleDice();
        setClickCount(0);
      }
    }
  };

  const handleDice = () => {
    setDices((prevDices) => [
      ...prevDices,
      {
        id: dices.length,
        left: objectRef.current.offsetWidth - objectRef.current.offsetWidth * 0.2 * (dices.length + 1),
      },
    ]);
    setIsDiceAnimating(true);
    setDiceSequence(0);
    playSound("slice", 0.2);
    setTimeout(() => setIsDiceAnimating(false), 50);
  };

  const onDraggableMove = (x, y) => {
    setKnifePosition({ x, y });
  };

  return (
    <div className="cut-table d-flex h-100 mx-auto">
      <div style={{ width: "100%", height: "100%" }}>
        <div
          className={assetName}
          ref={objectRef}
          style={{
            position: "absolute",
            left: initialLeft,
            touchAction: "none",
            width: `${width}%`,
            clipPath: `inset(0 ${(dices.length * 100) / interactionTimes}% 0 0)`,
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
              borderTopColor: diceSequence === 1 ? "#ffffff50" : "black",
              borderTopWidth: diceSequence === 1 ? `${clickCount * hitBoxRef.current.offsetWidth * 0.4}px` : 2,
              borderTopStyle: "solid",
              width: `${100 / interactionTimes}%`,
              height: "100%",
              position: "absolute",
              top: "0",
              right: `${(100 / interactionTimes) * dices.length}%`,
              transition: "right 0.5s ease-in-out",
            }}
          />
        </div>
        {dices.map((dice) => (
          <div
            key={dice.id}
            className={assetName + "-dice"}
            style={{
              position: "absolute",
              left: initialLeft,
              width: `${width * 0.8}%`,
              zIndex: 2,
              top: "50%",
              transform: isDiceAnimating
                ? `translate(0, -50%)`
                : `translate(+${120 - (100 / interactionTimes) * dice.id}%, -50%)`,
              opacity: isDiceAnimating ? 0 : 1,
              transition: "all 0.5s ease-in-out",
            }}
          />
        ))}
        <div onClick={onKnifeClick}>
          <DraggableObject
            assetNames={["knife"]}
            isDraggableX={true}
            isDraggableY={true}
            width={15}
            onMove={onDraggableMove}
            scale={knifeScale}
          />
        </div>

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
    </div>
  );
}
