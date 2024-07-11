import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-endgame',
  standalone: true,
  imports: [],
  templateUrl: './endgame.component.html',
  styleUrl: './endgame.component.css'
})
export class EndgameComponent {
  @Input() message: string='';
  @Output() replay = new EventEmitter<void>();
}
