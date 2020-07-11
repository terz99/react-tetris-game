import React, {useState} from "react";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {checkCollision, createStage} from "../utils/gameHelpers";
import {StyledTetris, StyledTetrisWrapper} from "./styles/StyledTetris";

// Hooks
import {usePlayer} from "../hooks/usePlayer";
import {useStage} from "../hooks/useStage";
import {useInterval} from "../hooks/useInterval";

function Tetris(props) {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  const movePlayer = (dir) => {
    if (checkCollision(player, stage, { x: dir, y: 0 })) {
      return;
    }
    updatePlayerPos({
      x: dir,
      y: 0
    });
  }

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setDropTime(1000);
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({
        x: 0,
        y: 1,
        collided: false
      });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({
        x: 0,
        y: 0,
        collided: true
      });
    }
  }

  const keyUp = ({ keyCode }) => {
    if (gameOver) {
      return;
    }

    if (keyCode === 40) {
      console.log("keyup")
      setDropTime(1000);
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (gameOver) {
      return;
    }

    switch (keyCode) {
      case 37:
        movePlayer(-1);
        break;
      case 39:
        movePlayer(1);
        break;
      case 40:
        dropPlayer();
        break;
      case 38:
        playerRotate(stage, 1);
        break;
    }
  }

  useInterval(drop, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={e => move(e)}
      onKeyUp={e => keyUp(e)}
    >
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
        <StartButton callback={() => startGame()}/>
      </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default Tetris;