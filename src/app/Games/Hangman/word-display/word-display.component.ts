import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../Services/game.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-word-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-display.component.html',
  styleUrl: './word-display.component.css'
})
export class WordDisplayComponent {
  @Input() word: string = '';
  @Input() correctLetters: string[] = [];

  get wordArray(): string[] {
    return this.word.split('');
  }
}
