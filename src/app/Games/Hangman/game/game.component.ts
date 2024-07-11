import { Component, OnInit } from '@angular/core';
import { GameModelComponent } from "../game-model/game-model.component";
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { WordDisplayComponent } from "../word-display/word-display.component";
import { GameService } from '../Services/game.service';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [GameModelComponent, KeyboardComponent, WordDisplayComponent]
})
export class GameComponent implements OnInit {
  currentWord: string = '';
  correctLetters: string[] = [];
  hint: string = '';
  countWrongAnswers: number = 0;
  maxAnswers: number = 6;
  isGameOver: boolean = false;
  isVictory: boolean = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getRandomWord();
  }

  getRandomWord(): void {
    this.gameService.getRandomWord().subscribe(wordObj => {
      this.currentWord = wordObj.word.toUpperCase();
      this.hint = wordObj.hint;
      this.resetGame();
    });
  }

  checkLetter(letter: string): void {
    if (!this.isGameOver) {
      if (this.currentWord.includes(letter) && !this.correctLetters.includes(letter)) {
        this.correctLetters.push(letter);
        if (this.checkWinCondition()) {
          this.handleGameEnd(true);
        }
      } else {
        this.countWrongAnswers++;
        if (this.countWrongAnswers >= this.maxAnswers) {
          this.handleGameEnd(false);
        }
      }
    }
  }

  resetGame(): void {
    this.correctLetters = [];
    this.countWrongAnswers = 0;
    this.isGameOver = false;
    this.isVictory = false;
  }

  checkWinCondition(): boolean {
    return this.currentWord.split('').every(letter => this.correctLetters.includes(letter));
  }

  handleGameEnd(isVictory: boolean): void {
    console.log('Game Ended:', isVictory ? 'Victory' : 'Defeat'); // Debugging statement
    this.isGameOver = true;
    this.isVictory = isVictory;
  }

}
