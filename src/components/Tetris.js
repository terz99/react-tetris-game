import React, {useState} from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {createStage} from "../utils/gameHelpers";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";

// Hooks
import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";

function Tetris(props) {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player] = usePlayer();
  const [stage, setStage] = useStage();

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
      <Stage stage={stage}/>
      <aside>
        {gameOver ?
          (<Display
            gameOver={gameOver}
            text={'Game Over'}
          />) : (
        <div>
          <Display text={"Score"}/>
          <Display text={"Rows"}/>
          <Display text={"Level"}/>
        </div> )
        }
        <StartButton callback={() => console.log("clicked")}/>
      </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default Tetris;