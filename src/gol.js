document.addEventListener("DOMContentLoaded", () => {
  const cellArray = [
    {
      name: "cell-alive",
      image: "images/alive.png",
    },
    {
      name: "cell-dead",
      image: "images/alive.png",
    },
  ];
  const rows = 6;
  const columns = rows;

  const cellsChosen = [];
  const grid = document.querySelector(".grid");
  const matrix = [];
  const start = document.querySelector(".startButton");
  let colum = [];
  start.addEventListener("click", startGame);

  const createMatrix = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let cell;
        cell = document.createElement(`img`);
        cell.setAttribute("src", "images/dead.png");
        cell.setAttribute("data-id", `[${i}][${j}]`);
        cell.addEventListener("click", giveBirth);
        grid.appendChild(cell);
        colum.push(cell);
      }

      matrix[i] = colum;
      colum = [];
      console.log(matrix);
    }
  };
  function giveBirth() {
    let cellId = this.getAttribute("data-id");
    this.setAttribute("src", "images/alive.png");
    console.log(cellId);
  }

  function startGame() {
    start.removeEventListener("click", startGame);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let state = matrix[i][j].getAttribute("src");
        if (state === "images/alive.png") {
          cellsChosen.push(matrix[i][j]);
        }
      }
    }
    console.log(cellsChosen);
  }
  createMatrix();
  console.log(cellsChosen);
});
