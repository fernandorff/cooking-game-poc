import React, { useState, useRef, useEffect } from "react";
import "./objects.css";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./draggable-object.component";

export function ProcessIngredient({
  assetName,
  initialLeft = "15%",
  width = "25",
  amount = 2,
  interactionTimes = 3,
  mode = "slice",
}) {
  const [pieces, setPieces] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hitBoxSides, setHitBoxSides] = useState({
    hitBoxLeft: 0,
    hitBoxRight: 0,
    hitBoxTop: 0,
    hitBoxBottom: 0,
  });
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const objectRef = useRef(null);
  const hitBoxRef = useRef(null);
  const [gameSequence, setGameSequence] = useState(0);
  const [ingredientAmount, setIngredientAmount] = useState(amount);
  const [chopCount, setChopCount] = useState(0);
  const [knifeScale, setKnifeScale] = useState(1);

  useEffect(() => {
    console.log(ingredientAmount);
  }, [ingredientAmount]);

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
  }, [pieces]);

  useEffect(() => {
    const checkKnifePosition = () => {
      const { x, y } = knifePosition;
      const { hitBoxLeft, hitBoxRight, hitBoxTop, hitBoxBottom } = hitBoxSides;

      if (mode === "dice") {
        if (x > hitBoxLeft && x < hitBoxRight && y > hitBoxTop && y < hitBoxBottom) {
          setGameSequence(1);
        } else {
          setGameSequence(0);
        }
      }

      if (mode === "slice") {
        if (gameSequence === 0 && y > hitBoxTop && y < hitBoxTop + 5 && x > hitBoxLeft && x < hitBoxRight) {
          setGameSequence(1);
        } else if (
          gameSequence === 1 &&
          y > hitBoxBottom - 5 &&
          y < hitBoxBottom &&
          x > hitBoxLeft &&
          x < hitBoxRight
        ) {
          handleProcess();
          setGameSequence(0);
        } else if (gameSequence === 1 && (y < hitBoxTop || y > hitBoxBottom || x < hitBoxLeft || x > hitBoxRight)) {
          setGameSequence(0);
        }
      }
    };

    checkKnifePosition();
  }, [knifePosition]);

  useEffect(() => {
    if (pieces.length === interactionTimes) {
      setIngredientAmount((prevIngredientAmount) => prevIngredientAmount - 1);
      playSound("success", 0.2);
    }
  }, [pieces]);

  useEffect(() => {
    if (pieces.length === interactionTimes && ingredientAmount - 1 > 0) {
      const piecesDiv = document.querySelector(".pieces");
      piecesDiv.style.transition = "opacity 1s ease-in-out";
      piecesDiv.style.opacity = 0;
      setTimeout(() => {
        setPieces([]);
        piecesDiv.style.transition = "none";
        piecesDiv.style.opacity = 1;
      }, 1000);
    }
  }, [pieces]);

  const onKnifeChop = (event) => {
    event.stopPropagation();
    setKnifeScale(0.8);
    setTimeout(() => setKnifeScale(1), 100);
    if (gameSequence === 1) {
      setChopCount((prevChopCount) => prevChopCount + 1);
      playSound("chop", 0.2);

      if (chopCount >= 4) {
        handleProcess();
        setChopCount(0);
      }
    }
  };

  const handleProcess = () => {
    setPieces((prevPieces) => [
      ...prevPieces,
      {
        id: pieces.length,
        left: objectRef.current.offsetWidth - objectRef.current.offsetWidth * 0.2 * (pieces.length + 1),
      },
    ]);
    setIsAnimating(true);
    setGameSequence(0);
    playSound("slice", 0.2);
    setTimeout(() => setIsAnimating(false), 50);
  };

  const onDraggableMove = (x, y) => {
    setKnifePosition({ x, y });
  };

  return (
    <div className="cut-table d-flex h-100 mx-auto p-5">
      <h1>
        {mode} {assetName}
      </h1>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          className={assetName}
          ref={objectRef}
          style={{
            position: "absolute",
            left: initialLeft,
            touchAction: "none",
            width: `${width}%`,
            clipPath: `inset(0 ${(pieces.length * 100) / interactionTimes}% 0 0)`,
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
              borderTopColor: gameSequence === 1 && mode === "slice" ? "#ffffff50" : "black",
              borderTopWidth:
                gameSequence === 1 && mode === "slice" ? `${knifePosition.y - hitBoxSides.hitBoxTop}px` : `2px`,
              borderTopStyle: mode === "slice" ? "solid" : "dotted",
              width: `${100 / interactionTimes}%`,
              height: "100%",
              position: "absolute",
              top: "0",
              right: `${(100 / interactionTimes) * pieces.length}%`,
              transition: "right 0.5s ease-in-out",
              borderBottomColor: gameSequence === 1 && mode === "dice" ? "#ffffff50" : "black",
              borderBottomWidth:
                gameSequence === 1 && mode === "dice" ? `${chopCount * objectRef.current.clientHeight * 0.2}px` : `2px`,
              borderBottomStyle: mode === "dice" ? "solid" : "dotted",
            }}
          />
        </div>
        <div className="pieces">
          {ingredientAmount > 0 &&
            pieces.map((piece) => (
              <div
                key={piece.id}
                className={assetName + "-" + mode}
                style={{
                  position: "absolute",
                  left: initialLeft,
                  width: `${width * 0.8}%`,
                  zIndex: 2,
                  top: "50%",
                  transform: isAnimating
                    ? `translate(0, -50%)`
                    : `translate(+${120 - (100 / interactionTimes) * piece.id}%, -50%)`,
                  opacity: isAnimating ? 0 : 1,
                  transition: "all 0.5s ease-in-out",
                }}
              />
            ))}
        </div>
        <div onClick={onKnifeChop}>
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
          <h2
            style={{ backgroundColor: "#ffffff99", borderRadius: "50%", width: "50px", height: "50px" }}
            className="text-center"
          >
            {ingredientAmount}
          </h2>
        </div>
        <div
          className={assetName + "-" + mode + " d-flex justify-content-center align-items-center score"}
          style={{
            position: "fixed",
            width: `100px`,
            zIndex: 3,
            top: "15%",
            right: 0,
          }}
        >
          <h2
            style={{ backgroundColor: "#ffffff99", borderRadius: "50%", width: "50px", height: "50px" }}
            className="text-center"
          >
            {amount - ingredientAmount}
          </h2>
        </div>
      </div>
    </div>
  );
}
