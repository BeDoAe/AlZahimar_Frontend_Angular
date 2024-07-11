// import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';
// import { EndgameComponent } from "../endgame/endgame.component";
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-board',
//   standalone: true,
//   templateUrl: './board.component.html',
//   styleUrls: ['./board.component.css'],
//   imports: [EndgameComponent, CommonModule]
// })
// export class BoardComponent implements OnInit {
//   cells: string[] = [];
//   origBoard: (number | string)[] = [];
//   oPlayer: string = 'O';
//   aiPlayer: string = 'X';
//   winCombos: number[][] = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [6, 4, 2]
//   ];
//   gameOver: boolean = false;
//   endMessage: string = '';

//   ngOnInit() {
//     this.startGame();
//   }

//   startGame() {
//     this.gameOver = false;
//     this.endMessage = '';
//     this.origBoard = Array.from(Array(9).keys());
//     this.cells = Array(9).fill('');

//     // Reset cell background colors
//     for (let i = 0; i < 9; i++) {
//       const cell = document.getElementById(i.toString());
//       if (cell) {
//         cell.style.backgroundColor = '';
//       }
//     }
//   }

//   turnClick(index: number) {
//     if (typeof this.origBoard[index] === 'number') {
//       this.turn(index, this.oPlayer);
//       if (!this.checkTie() && !this.gameOver) this.turn(this.bestSpot(), this.aiPlayer);
//     }
//   }

//   turn(index: number, player: string) {
//     this.origBoard[index] = player;
//     this.cells[index] = player;
//     const gameWon = this.checkWin(this.origBoard, player);
//     if (gameWon) this.gameOverMethod(gameWon);
//   }

//   checkWin(board: (number | string)[], player: string) {
//     let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [] as number[]);
//     let gameWon = null;
//     for (let [index, win] of this.winCombos.entries()) {
//       if (win.every(elem => plays.indexOf(elem) > -1)) {
//         gameWon = { index: index, player: player };
//         break;
//       }
//     }
//     return gameWon;
//   }

//   gameOverMethod(gameWon: { index: number; player: string }) {
//     for (let index of this.winCombos[gameWon.index]) {
//       const cell = document.getElementById(index.toString());
//       if (cell) {
//         cell.style.backgroundColor = gameWon.player === this.oPlayer ? 'blue' : 'red';
//       }
//     }
//     this.gameOver = true;
//     this.endMessage = gameWon.player === this.oPlayer ? 'You win!' : 'You lose.';

//     Swal.fire({
//       title: this.endMessage,
//       confirmButtonText: 'Try Again',
//       showClass: {
//         popup: 'animate__animated animate__fadeInUp animate__faster'
//       },
//       hideClass: {
//         popup: 'animate__animated animate__fadeOutDown animate__faster'
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.startGame();
//       }
//     });
//   }

//   checkTie() {
//     if (this.origBoard.filter(s => typeof s === 'number').length === 0) {
//       this.gameOver = true;
//       this.endMessage = 'Tie Game!';

//       Swal.fire({
//         title: this.endMessage,
//         confirmButtonText: 'Try Again',
//         showClass: {
//           popup: 'animate__animated animate__fadeInUp animate__faster'
//         },
//         hideClass: {
//           popup: 'animate__animated animate__fadeOutDown animate__faster'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           this.startGame();
//         }
//       });

//       return true;
//     }
//     return false;
//   }

//   bestSpot() {
//     return this.minimax(this.origBoard, this.aiPlayer).index!;
//   }

//   minimax(newBoard: (number | string)[], player: string) {
//     const availSpots = newBoard.filter(s => typeof s === 'number') as number[];

//     if (this.checkWin(newBoard, this.oPlayer)) {
//       return { index: -1, score: -10 };
//     } else if (this.checkWin(newBoard, this.aiPlayer)) {
//       return { index: -1, score: 10 };
//     } else if (availSpots.length === 0) {
//       return { index: -1, score: 0 };
//     }

//     const moves: { index: number; score: number }[] = [];
//     for (let i = 0; i < availSpots.length; i++) {
//       const move: { index: number; score: number } = {
//         index: newBoard[availSpots[i]] as number,
//         score: 0
//       };
//       newBoard[availSpots[i]] = player;

//       if (player === this.aiPlayer) {
//         const result = this.minimax(newBoard, this.oPlayer);
//         move.score = result.score;
//       } else {
//         const result = this.minimax(newBoard, this.aiPlayer);
//         move.score = result.score;
//       }

//       newBoard[availSpots[i]] = move.index;
//       moves.push(move);
//     }

//     let bestMove = 0;
//     if (player === this.aiPlayer) {
//       let bestScore = -10000;
//       for (let i = 0; i < moves.length; i++) {
//         if (moves[i].score > bestScore) {
//           bestScore = moves[i].score;
//           bestMove = i;
//         }
//       }
//     } else {
//       let bestScore = 10000;
//       for (let i = 0; i < moves.length; i++) {
//         if (moves[i].score < bestScore) {
//           bestScore = moves[i].score;
//           bestMove = i;
//         }
//       }
//     }
//     return moves[bestMove];
//   }
// }

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EndgameComponent } from "../endgame/endgame.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../components/Footer/footer/footer.component";

@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    imports: [EndgameComponent, CommonModule]
})
export class BoardComponent implements OnInit {
  cells: string[] = [];
  origBoard: (number | string)[] = [];
  oPlayer: string = 'O';
  aiPlayer: string = 'X';
  winCombos: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
  ];
  gameOver: boolean = false;
  endMessage!: string ;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.gameOver = false;
    this.endMessage = '';
    this.origBoard = Array.from(Array(9).keys());
    this.cells = Array(9).fill('');

    // Reset cell background colors
    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(i.toString());
      if (cell) {
        cell.style.backgroundColor = 'lightgray';
      }
    }
  }


  turnClick(index: number) {
    if (typeof this.origBoard[index] === 'number') {
      this.turn(index, this.oPlayer);
      if (!this.checkTie() && !this.gameOver) this.turn(this.bestSpot(), this.aiPlayer);
    }
  }

  turn(index: number, player: string) {
    this.origBoard[index] = player;
    this.cells[index] = player;
    const gameWon = this.checkWin(this.origBoard, player);
    if (gameWon) this.gameOverMethod(gameWon);
  }

  checkWin(board: (number | string)[], player: string) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [] as number[]);
    let gameWon = null;
    for (let [index, win] of this.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }
    return gameWon;
  }

  gameOverMethod(gameWon: { index: number; player: string }) {
    for (let index of this.winCombos[gameWon.index]) {
      const cell = document.getElementById(index.toString());
      if (cell) {
        cell.style.backgroundColor = gameWon.player === this.oPlayer ? 'blue' : 'red';
      }
    }
    this.gameOver = true;
    this.endMessage = gameWon.player === this.oPlayer ? 'You win!' : 'You lose.';

    Swal.fire({
      title: this.endMessage,
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.startGame();
      }
    });
  }

  checkTie() {
    if (this.origBoard.filter(s => typeof s === 'number').length === 0) {
      this.gameOver = true;
      this.endMessage = 'Tie Game!';

      Swal.fire({
        title: this.endMessage,
        confirmButtonText: 'Try Again',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.startGame();
        }
      });

      return true;
    }
    return false;
  }

  bestSpot() {
    return this.minimax(this.origBoard, this.aiPlayer).index!;
  }

  minimax(newBoard: (number | string)[], player: string) {
    const availSpots = newBoard.filter(s => typeof s === 'number') as number[];

    if (this.checkWin(newBoard, this.oPlayer)) {
      return { index: -1, score: -10 };
    } else if (this.checkWin(newBoard, this.aiPlayer)) {
      return { index: -1, score: 10 };
    } else if (availSpots.length === 0) {
      return { index: -1, score: 0 };
    }

    const moves: { index: number; score: number }[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: { index: number; score: number } = {
        index: newBoard[availSpots[i]] as number,
        score: 0
      };
      newBoard[availSpots[i]] = player;

      if (player === this.aiPlayer) {
        const result = this.minimax(newBoard, this.oPlayer);
        move.score = result.score;
      } else {
        const result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }

    let bestMove = 0;
    if (player === this.aiPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
}
