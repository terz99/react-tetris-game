import React from "react";
import Cell from "./Cell";

function Stage(props) {
  console.log(props.stage);
  return (
    <div>
      {props.stage.map(row =>
        row.map((cell, x) => {
          return (
            <Cell
              key={x}
              type={cell[0]}
            />
          );
        })
      )}
    </div>
  );
}

export default Stage;