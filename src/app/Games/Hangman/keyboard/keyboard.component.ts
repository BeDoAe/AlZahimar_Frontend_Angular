import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @Output() letterClicked = new EventEmitter<string>();

  // Define the alphabet array
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Method to handle letter click
  handleClick(letter: string): void {
    this.letterClicked.emit(letter);
  }
}
