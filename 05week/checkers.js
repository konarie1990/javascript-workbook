"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checker {
  // Your code here
  constructor(checkerColor, row, column) {
    // similar to what we did in class, but using if statement create "B" black or "R" red pieces
    if (checkerColor === "red") {
      // (taken from viewGrid) push the symbol of the checker in that location into the array
      this.symbol = "r";
    } else {
      this.symbol = "b";
    }
    this.row = row;
    this.column = column;
    // console.log(this.symbol, "============this is a game piece===========");
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the checker in that location into the array
          // symbol = checker (specify red or black)
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(" ");
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(" ");
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  placePieces() {
    let redPiece = [];
    for (let redHorizontal = 0; redHorizontal < 3; redHorizontal++) {
      for (let redVertical = 0; redVertical < 8; redVertical++) {
        if ((redHorizontal + redVertical) % 2 === 1) {
          redPiece.push([redHorizontal, redVertical]);
        }
      }
    }
    console.log(redPiece);
    for (let i = 0; i < redPiece.length; i++) {
      // make the next checker piece
      let redRow = redPiece[i][0];
      let redColumn = redPiece[i][1];
      let newRedPiece = new Checker("red");
      this.checkers.push(newRedPiece);
      console.log(this.grid);
      console.log(this.grid[redRow]);

      this.grid[redRow][redColumn] = newRedPiece;
    }
    let blackPiece = [];
    for (let blackHorizontal = 5; blackHorizontal < 8; blackHorizontal++) {
      for (let blackVertical = 0; blackVertical < 8; blackVertical++) {
        if ((blackHorizontal + blackVertical) % 2 === 1) {
          blackPiece.push([blackHorizontal, blackVertical]);
        }
      }
    }
    console.log(blackPiece);
    for (let i = 0; i < blackPiece.length; i++) {
      let blackRow = blackPiece[i][0];
      let blackColumn = blackPiece[i][1];
      let newBlackPiece = new Checker("black");
      console.log(this.grid[blackRow]);
      this.checkers.push(newBlackPiece);
      this.grid[blackRow][blackColumn] = newBlackPiece;
    }
  }

  // Your code here
}

class Game {
  constructor() {
    this.board = new Board();
  }
  start() {
    this.board.createGrid();
    this.board.placePieces();
  }
  moveChecker(whichPiece, toWhere) {
    console.log(whichPiece, toWhere);
    console.log(typeof (whichPiece, toWhere));
    // convert data input into a number so that math can be performed
    // using parseInt on whichPiece along with charAt to target the string position then convert to array
    let startPos = [
      parseInt(whichPiece.charAt(0)),
      parseInt(whichPiece.charAt(1))
    ];
    console.log(startPos);
    let endPos = [parseInt(toWhere.charAt(0)), parseInt(toWhere.charAt(1))];
    console.log(endPos);

    let currentPiece = this.board.checkers.find(checker => {
      return (
        checker.row === whichPiece.charAt(0) &&
        checker.column === whichPiece.charAt(1)
      );
    });

    // put the startPos and endPos into an array to target the numbers
    this.board.grid[endPos[0]][endPos[1]] = this.board.grid[startPos[0]][
      startPos[1]
    ];
    // set the start position back to null
    this.board.grid[startPos[0]][startPos[1]] = null;
    // we wanna make sure that no piece is a leagal adjecent
    // we want to check the next adjacent spot
    // ** ternary operators ---> basically if statements with shorthand ? and :

    if (endPos[0] - startPos[0] === 2) {
      let jumpedRow =
        endPos[0] - startPos[0] > 0 ? startPos[0] + 1 : endPos[0] + 1;
      let jumpedColumn =
        endPos[1] - startPos[1] > 0 ? startPos[1] + 1 : endPos[1];
      // removing targeted piece and making it null
      //EXTRA CREDIT king logic
      // EXTRA CREDIT - required moves logic legal moves (jumps)
      console.log(jumpedRow);
      console.log(jumpedColumn);

      this.board.grid[jumpedRow][jumpedColumn] = null;
      this.board.checkers.pop();
      console.log(this.board.checkers.slice(-1)[0]);
    }
    // function isLegal() {
    //   if (endPos[])
    // }
  }
}

// we wanna make sure the move is legal
// be within the parameters of the 8x8 grid - startpoints and end points need to be within
// check for an empty

function getPrompt() {
  game.board.viewGrid();
  rl.question("which piece?: ", whichPiece => {
    rl.question("to where?: ", toWhere => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();

// Tests
if (typeof describe === "function") {
  describe("Game", () => {
    it("should have a board", () => {
      assert.equal(game.board.constructor.name, "Board");
    });
    it("board should have 24 checkers", () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe("Game.moveChecker()", () => {
    it("should move a checker", () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker("50", "41");
      assert(game.board.grid[4][1]);
      game.moveChecker("21", "30");
      assert(game.board.grid[3][0]);
      game.moveChecker("52", "43");
      assert(game.board.grid[4][3]);
    });
    it("should be able to jump over and kill another checker", () => {
      game.moveChecker("30", "52");
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
