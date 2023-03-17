import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";
import { SliceableObject } from "./component/sliceabble-object.component";

const ingredients = ["tomato", "tomato"];
const utensils = ["knife", "knife"];

export function Poc2() {
  return (
    <div className="row">
      <div className="col-2 bg-success d-flex flex-column align-items-center p-1">
        <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} width={80} />
        <DraggableObject assetNames={["tomato"]} isDraggableX={true} isDraggableY={true} width={80} />
      </div>
      <div className="col-8 bg-light vh-100 d-flex flex-column align-items-center p-1">
        <progress className="progress" value={100} max={200} />

        <div className="table d-flex justify-content-center align-items-center p-5">
          <SliceableObject assetName={["tomato"]} width={33} />
        </div>
      </div>
      <div className="col-2 bg-danger d-flex flex-column align-items-center p-1">
        <DraggableObject assetNames={["knife"]} isDraggableX={true} isDraggableY={true} width={25} />
      </div>
    </div>
  );
}
