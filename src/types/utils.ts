import { BoardSettings } from "./board";

export interface GamePlayer {
  id: string;
  name: string;
  character?: number;
}

export interface GameCard {
  id: string;
  name: string;
  type: CardType;
}

export enum CardType {
  CHARACTER,
  ROOM,
  WEAPON,
}

export interface Hypothesis {
  character: number;
  room: number;
  weapon: number;
}

export type GameContext = {
  players: GamePlayer[];
  currentPlayer: null | GamePlayer["id"];
  decks: {
    deck: GameCard[];
    players: GameCard[][];
    solution: GameCard[];
  };
  settings: BoardSettings;
};
