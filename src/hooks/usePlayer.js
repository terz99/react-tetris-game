import {useCallback, useState} from "react";
import {randomTetromino, TETROMINOS} from "../utils/tetrominos";
import {STAGE_WIDTH} from "../utils/gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {
      x: 0,
      y: 0
    },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prevState => ({
      ...prevState,
      pos: {
        x: prevState.pos.x + x,
        y: prevState.pos.y + y
      },
      collided: collided
    }));
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {
        x: STAGE_WIDTH / 2 - 2,
        y: 0
      },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
}