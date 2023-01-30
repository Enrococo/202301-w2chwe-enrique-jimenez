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
  const rows = 12;
  const columns = rows;

  let toStayAlive = [];
  let toDie = [];
  let toRevive = [];

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
    let surrAlive = 0;
    let surrDead = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (matrix[a - i][b - j].getAttribute("src") === "images/alive.png") {
          surrAlive++;
        }
        if (matrix[a - i][b - j].getAttribute("src") === "images/dead.png") {
          surrDead++;
        }
      }
    }
    if (surrAlive === 3) {
      toRevive.push(matrix[a][b]);
    }
    
  };
  const checkSurroundingsAlive = (a, b) => {
    let surrAlive = -1;
    let surrDead = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (matrix[a - i][b - j].getAttribute("src") === "images/alive.png") {
          surrAlive++;
        }
        if (matrix[a - i][b - j].getAttribute("src") === "images/dead.png") {
          surrDead++;
        }
      }
    }
    if (surrAlive === 2 || surrAlive === 3) {
      toStayAlive.push(matrix[a][b]);
    } else if (surrDead > 6 || surrAlive>3) {
      toDie.push(matrix[a][b]);
    }
    //matrix[a][b].setAttribute("src", "images/dead.png");
  }

  const nextStage = () => {
    for (let i=0 ; i<toDie.length; i++){
        toDie[i].setAttribute('src', "images/dead.png");
    }
    for (let i = 0; i<toRevive.length; i++){
        toRevive[i].setAttribute('src', "images/alive.png");
    }
    toDie=[];
    toRevive=[];
  }

  function startGame() {
    start.removeEventListener("click", startGame);
   for (let i = 1; i < rows-1; i++) {
      for (let j = 1; j < columns-1; j++) {
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
    nextStage();

    console.log(cellsAlive);
    console.log(toStayAlive);
    console.log(toDie);
    console.log(toRevive);
    start.addEventListener('click',startGame);
} 
  createMatrix();
});
