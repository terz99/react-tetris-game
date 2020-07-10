export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WIDTH).fill([0, 'clear']);
  });
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. Check that we are on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        // 2. Check that our move is inside the game areas height (y)
        // We should not go through the bottom of the play area
        // 3. Check that our move is inside the game areas width (x)
        // We should not go through the sides of the play area
        // 4. Check that the cell we are moving to is not set to clear
        if (!stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
          return true;
        }
      }
    }
  }

  return false;
}