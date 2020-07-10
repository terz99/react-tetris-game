import React from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {createStage} from "../utils/gameHelpers";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";

function Tetris(props) {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
      <Stage stage={createStage()}/>
      <aside>
        <div>
          <Display text={"Score"}/>
          <Display text={"Rows"}/>
          <Display text={"Level"}/>
        </div>
        <StartButton callback={() => console.log("clicked")}/>
      </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default Tetris;