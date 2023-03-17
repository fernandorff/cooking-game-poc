import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";

const ingredients = ["tomato", "tomato"];
const utensils = ["knife", "knife"];

export function Poc2() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 bg-success d-flex flex-column align-items-center p-1">
          <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} />
          <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} />
        </div>
        <div className="col-8 bg-light vh-100 d-flex flex-column align-items-center p-1">
          <progress className="progress" value={100} max={200} />

          <div className="table"></div>
        </div>
        <div className="col-2 bg-danger d-flex flex-column align-items-center p-1">
          <DraggableObject assetNames={["knife"]} isDraggableX={true} isDraggableY={true} />
        </div>
      </div>
    </div>
  );
}
