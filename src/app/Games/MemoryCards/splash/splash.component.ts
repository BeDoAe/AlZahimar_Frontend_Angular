import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { MemoryCardsGameService } from '../Services/memory-cards-game.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
  @Output() playerNameSet: EventEmitter<string> = new EventEmitter<string>();

  constructor(private memoryCardsgameService: MemoryCardsGameService) {}

  startGame() {
    const yourName = prompt("Enter Your Name");

    // Check if user entered a name or canceled the prompt
    if (yourName !== null) {
      this.memoryCardsgameService.setPlayerName(yourName);
      this.playerNameSet.emit(yourName); // Emit the player name
      document.getElementById('splash')!.style.display = 'none';
    } else {
      // Handle case where user canceled the prompt (optional)
      console.log('User canceled entering the name.');
    }
  }
}
