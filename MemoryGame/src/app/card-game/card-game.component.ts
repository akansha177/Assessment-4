import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

interface Card {
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent{

  private router = inject(Router)
  cards: Card[] = [
    { image: './../assets/game1.jpg', flipped: false, matched: false },
    { image: './../assets/game2.jpg', flipped: false, matched: false },
    { image: './../assets/game3.jpg', flipped: false, matched: false },
    { image: './../assets/game1.jpg', flipped: false, matched: false },
    { image: './../assets/game2.jpg', flipped: false, matched: false },
    { image: './../assets/game3.jpg', flipped: false, matched: false },
  ];

  totalCards: number = this.cards.length;
  flippedCards: Card[] = [];
  isFlipping: boolean = false;
  totalMoves: number = 0;
  successMoves: number = 0;
  accuracy: number = 0;
  roundsPlayed: number = 0 ;
  showWinMessage: boolean = false;
  constructor (){
    this.cards = this.shuffle(this.cards);

  }
  shuffle = (array: Card[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 
  flipCard(card: Card) {
    if (!this.isFlipping && !card.flipped && this.flippedCards.length < 2) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.totalMoves = this.totalMoves + 1;
        this.accuracy = (this.successMoves/this.totalMoves)*100;
        this.isFlipping = true;
        setTimeout(() => {
          this.checkMatch();
          this.isFlipping = false;
        }, 1000);
      }
    }
  }

  checkMatch() {
    if (this.flippedCards[0].image === this.flippedCards[1].image) {
      this.flippedCards.forEach(card => (card.matched = true));
      this.successMoves = this.successMoves + 1;
      if (this.successMoves == (this.totalCards/2)){
        this.roundsPlayed = this.roundsPlayed+1;
        this.showWinMessage = true;
      }
      this.accuracy = (this.successMoves/this.totalMoves)*100;
    } else {
      this.flippedCards.forEach(card => (card.flipped = false));
    }

    this.flippedCards = [];
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToHomePage(): void{
    this.router.navigate(['/']);
  }
}

// 
