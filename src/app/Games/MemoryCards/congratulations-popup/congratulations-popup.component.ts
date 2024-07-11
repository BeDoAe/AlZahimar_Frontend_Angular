import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-congratulations-popup',
  standalone: true,
  imports: [],
  templateUrl: './congratulations-popup.component.html',
  styleUrl: './congratulations-popup.component.css'
})
export class CongratulationsPopupComponent {
  //@Input() playerName: string='';
  @Output() playAgainClicked: EventEmitter<void> = new EventEmitter<void>();

  playAgain() {
    this.playAgainClicked.emit();
  }
}
