import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../game-board/game-board.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card: Card = { fruit: '', clicked: false, matched: false };
  @Output() cardClicked: EventEmitter<Card> = new EventEmitter<Card>();

  onClick() {
    if (!this.card.clicked && !this.card.matched) {
      this.card.clicked = true; // Update clicked state
      this.cardClicked.emit(this.card);
    }
  }
}
