import React, { useState, useEffect, useRef } from "react";
import { playSound } from "../helpers/playSound";
import { DraggableObject } from "./component/draggable-object.component";
import { SliceableObject } from "./component/sliceable-object.component";

const ingredients = ["tomato", "tomato"];
const utensils = ["knife", "knife"];

export function Poc2() {
  return (
    <div className="cut-table d-flex h-100 mx-auto">
      <SliceableObject assetName={["onion"]} width={15} initialLeft={"10%"} />
    </div>
  );
}
