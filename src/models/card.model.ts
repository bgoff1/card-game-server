export class Card {
  rank: string;
  suit: string;
  constructor(rank: { rank: string; suit: string } | string, suit?: string) {
    if (typeof rank === 'string' && suit) {
      this.rank = rank;
      this.suit = suit;
    } else if (typeof rank !== 'string') {
      this.rank = rank.rank;
      this.suit = rank.suit;
    } else {
      this.rank = this.suit = '';
    }
  }
}
