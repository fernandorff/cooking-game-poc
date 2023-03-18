import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";
import { SliceableObject } from "./component/sliceable-object.component";

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
        <div className="cut-table d-flex px-5 vh-100">
          <SliceableObject assetName={["onion"]} width={20} initialLeft={0} />
        </div>
      </div>
      <div className="col-2 bg-danger d-flex flex-column align-items-center p-1"></div>
    </div>
  );
}
