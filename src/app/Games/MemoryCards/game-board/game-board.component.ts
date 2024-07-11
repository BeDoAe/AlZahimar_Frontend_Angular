import { Component, OnInit } from '@angular/core';
import { MemoryCardsGameService } from '../Services/memory-cards-game.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { CongratulationsPopupComponent } from "../congratulations-popup/congratulations-popup.component";

export interface Card {
  fruit: string;
  clicked: boolean;
  matched: boolean;
}


@Component({
    selector: 'app-game-board',
    standalone: true,
    templateUrl: './game-board.component.html',
    styleUrl: './game-board.component.css',
    imports: [CardComponent, CommonModule, CongratulationsPopupComponent]
})
export class GameBoardComponent implements OnInit {
  playerName: string = '';
  wrongTries: number = 0;
  cards: Card[] = [];

  constructor(public memoryCardsGameService: MemoryCardsGameService) {}

  ngOnInit(): void {
    this.playerName = this.memoryCardsGameService.getPlayerName();
    this.wrongTries = this.memoryCardsGameService.getWrongTries();
    this.cards = this.memoryCardsGameService.getCards();
  }

  onCardClicked(card: Card) {
    this.memoryCardsGameService.flipCard(card);
    this.wrongTries = this.memoryCardsGameService.getWrongTries(); // Update wrong tries count
    
    if (this.memoryCardsGameService.isGameWon()) {
      this.showCongratulationsPopup();
    }
  }

  showCongratulationsPopup() {
    alert(`Congratulations, ${this.playerName}! You've won the game!`);
    this.memoryCardsGameService.resetGame();
    this.wrongTries = 0;
  }

  playAgain() {
    this.memoryCardsGameService.resetGame(); // Call your service method to reset the game
    this.wrongTries = 0; // Reset any other game-related variables

    this.cards = this.memoryCardsGameService.getCards(); // Optionally update cards if needed
  }

}
