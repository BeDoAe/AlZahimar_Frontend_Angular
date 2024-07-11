import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService } from '../Services/game.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-model.component.html',
  styleUrl: './game-model.component.css'
})
export class GameModelComponent {
  @Input() gameOver: boolean = false;
  @Input() isVictory: boolean = false;
  @Input() correctWord: string = '';
  @Output() playAgain = new EventEmitter<void>();

  get showSadImage(): boolean {
    return this.gameOver && !this.isVictory;
  }
}
