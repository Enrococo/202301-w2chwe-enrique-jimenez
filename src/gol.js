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

  const toStayAlive = [];
  const toDie = [];
  const toRevive = [];

  const cellsAlive = [];
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
    }
    console.log(matrix);
  };
  function giveBirth() {
    this.setAttribute("src", "images/alive.png");
    this.addEventListener(
      "click",
      (switchState = () => {
        if (this.getAttribute("src") === "images/alive.png") {
          this.setAttribute("src", "images/dead.png");
        } else {
          this.setAttribute("src", "images/alive.png");
        }
      })
    );
  }
  const checkSurroundingsDead = (a, b) => {
    let surrAlive = -1;
    let surrDead = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (matrix[a - i][b - j].getAttribute("src") === "images/alive.png") {
          surrAlive++;
        }
        if (matrix[a - i][b - j].getAttribute("src") === "images/dead.png"){
          surrDead++;
        }}
    }
      if (surrAlive > 2) {
        toRevive.push(matrix[a][b]);
      }
      //matrix[a][b].setAttribute("src", "images/dead.png");
}
  const checkSurroundingsAlive = (a, b) => {
    let surrAlive = -1;
    let surrDead = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (matrix[a - i][b - j].getAttribute("src") === "images/alive.png") {
          surrAlive++;
        }
        if (matrix[a - i][b - j].getAttribute("src") === "images/dead.png"){
          surrDead++;
        }}
    }
      if (surrAlive === 2 || surrAlive === 3) {
        toStayAlive.push(matrix[a][b]);
      }
      else if (surrDead>6){
        toDie.push(matrix[a][b]);
      }
      //matrix[a][b].setAttribute("src", "images/dead.png");
    
    
}

  function startGame() {
    start.removeEventListener("click", startGame);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let state = matrix[i][j].getAttribute("src");
        let cellId = matrix[i][j].getAttribute("data-id");
        if (state === "images/alive.png") {
          checkSurroundingsAlive(i, j);
          cellsAlive.push(matrix[i][j]);
        }
        if (state === "images/dead.png") {
            checkSurroundingsDead(i, j);
            
          }
      }
    }
    console.log(cellsAlive);
    console.log(`Estas sobreviven ${toStayAlive}`);
    console.log(`Éstas mueren ${toDie}`);
    console.log(`Éstas reviven ${toRevive}`);
  }
  createMatrix();
});
