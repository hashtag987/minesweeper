export const genRandomMines = (data = [], height = 0, width = 0, mines = 0) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randX = Math.floor(Math.random() * width);
    let randY = Math.floor(Math.random() * height);
    if (!data[randX][randY].isMine) {
      data[randX][randY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

export const getNeighbors = (
  i = 0,
  j = 0,
  data = [],
  height = 0,
  width = 0
) => {
  let neighbors = [];
  const surroundings = [
    [-1, -1], //left top corner
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });  
  return neighbors;
};

export const genNeighbors = (data = [], height = 0, width = 0) => {
  let dataCopy = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let mines = 0;
      const area = getNeighbors(
        data[i][j].x,
        data[i][j].y,
        data,
        height,
        width
      );
      //console.log(area);
      area.map((value) => {
        if (value.isMine) {
          return mines++;
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbors = mines;
    }
  }
  return dataCopy;
};

