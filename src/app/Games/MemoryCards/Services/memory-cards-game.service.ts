import { Injectable } from '@angular/core';

interface Card {
  fruit: string;
  clicked: boolean;
  matched: boolean;
  disableClick?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MemoryCardsGameService {

  private playerName: string = 'unknown';
  private wrongTries: number = 0;
  private cards: Card[] = [
    { fruit: 'pinaple', clicked: false, matched: false },
    { fruit: 'pinaple', clicked: false, matched: false },
    { fruit: 'apple', clicked: false, matched: false },
    { fruit: 'apple', clicked: false, matched: false },
    { fruit: 'banana', clicked: false, matched: false },
    { fruit: 'banana', clicked: false, matched: false },
    { fruit: 'kiwi', clicked: false, matched: false },
    { fruit: 'kiwi', clicked: false, matched: false },
    { fruit: 'orange', clicked: false, matched: false },
    { fruit: 'orange', clicked: false, matched: false },
    { fruit: 'fig', clicked: false, matched: false },
    { fruit: 'fig', clicked: false, matched: false },
    { fruit: 'pear', clicked: false, matched: false },
    { fruit: 'pear', clicked: false, matched: false },
    { fruit: 'strawberry', clicked: false, matched: false },
    { fruit: 'strawberry', clicked: false, matched: false },
    { fruit: 'watermelon', clicked: false, matched: false },
    { fruit: 'watermelon', clicked: false, matched: false },
    { fruit: 'berry', clicked: false, matched: false },
    { fruit: 'berry', clicked: false, matched: false }
  ];
  private gameWon: boolean = false;
  constructor() {
    this.shuffle(this.cards);
  }

  setPlayerName(name: string) {
    this.playerName = name ? name : 'unknown';
  }

  getPlayerName(): string {
    return this.playerName;
  }

  getWrongTries(): number {
    return this.wrongTries;
  }


  getCards(): Card[] {
    return this.cards;
  }

  flipCard(card: Card) {
    card.clicked = true;
    const clickedCards = this.cards.filter(c => c.clicked && !c.matched);
    if (clickedCards.length === 2) {
      this.stopClicking();
      setTimeout(() => {
        this.checkMatch(clickedCards);
      }, 1000);
    }


  }

  private stopClicking() {
    this.cards.forEach(c => c.disableClick = true);
  }

  private resumeClicking() {

    this.cards.forEach(c => c.disableClick = false);

  }

  private checkMatch(cards: Card[]) {
    if (cards[0].fruit === cards[1].fruit) {
      cards[0].matched = true;
      cards[1].matched = true;
      this.playSound('success');
    } else {
      this.wrongTries++;
      cards[0].clicked = false;
      cards[1].clicked = false;
      this.playSound('fail');
    }

    this.resumeClicking();
    this.checkWin();
  }

  private checkWin() {
    if (this.cards.every(c => c.matched)) {
      this.gameWon = true;
    }
  }
  isGameWon(): boolean {
    return this.gameWon;
  }
  resetGame() {
    this.wrongTries = 0;
    this.gameWon = false;
    this.cards.forEach(card => {
      card.clicked = false;
      card.matched = false;
      card.disableClick = false;
    });
    this.shuffle(this.cards);
  }

  private playSound(id: string) {
    const audio = document.getElementById(id) as HTMLAudioElement;
    if (audio) {
      audio.play();
    }
  }

  private shuffle(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }



}
