import { getRandomSequences } from './generate';

export const TILE_COUNT = 15;
export const TILE_ROW_COUNT = 5;
export const INITIAL_REVEAL_DURATION = 8;

export const tileTypesMap = [
  'cat',
  'present',
  'paperclip',
  'diamond',
  'rocket',
  'clock',
  'basketball',
  'bulb',
  'trolley',
  'scissors',
  'fishy',
  'house',
  'key',
  'pizza',
  'star',
];

export interface Tile {
  tileId: number;
  type: number;
  active: boolean;
  matched: boolean;
}

export enum GameState {
  NOT_STARTED = 0,
  INITIAL_REVEAL = 1,
  STARTED = 2,
}

export const getTileSequence = async (size: number = TILE_COUNT): Promise<Tile[]> => {
  const sequences = await getRandomSequences(size);
  const first = sequences[0];
  const second = sequences[1];
  const arr = [];

  // Riffle the two sequences together
  for (let i = 0; i < first.length; i++) {
    arr.push(first[i], second[i]);
  }

  return arr.map((n, i) => ({
    tileId: i,
    type: n,
    active: false,
    matched: false,
  }));
};
