import { DefaultValue, atom, selector, selectorFamily } from 'recoil';
import { shallowCopyTilesWithSplice } from '../lib';
import { GameState, getTileSequence } from '../lib/game';

export const interactionEnabledState = atom({
  key: 'InteractionEnabled',
  default: true,
});

export const gameStateState = atom({
  key: 'GameState',
  default: GameState.NOT_STARTED,
});

export const flipCountState = atom({
  key: 'FlipCount',
  default: 0,
});

export const tilesState = atom({
  key: 'Tiles',
  default: getTileSequence(),
});

export const tileByIdSelector = selectorFamily({
  key: 'TileById',
  get:
    (tileId) =>
    ({ get }) => {
      const tile = get(tilesState).find((t) => t.tileId === tileId);

      if (!tile) {
        throw new Error('No tile found');
      }
      return tile;
    },
  set:
    (tileId) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        return;
      }
      const currentArr = get(tilesState);
      const newArr = shallowCopyTilesWithSplice(
        currentArr,
        currentArr.findIndex((t) => t.tileId === tileId),
        newValue,
      );
      set(tilesState, newArr);
    },
});

/**
 * Whether any tile can currently be flipped; they *cannot* when:
 * a) The game state is in anything except the "started" state
 * b) There are two unmatched tiles currently flipped - there is a short delay to keep these open before they get
 *    auto-flipped back
 */
export const canFlipSelector = selector({
  key: 'CanFlip',
  get: ({ get }) => {
    return (
      get(gameStateState) === GameState.STARTED && get(tilesState).filter((t) => t.active && !t.matched).length < 2
    );
  },
});
export const incorrectFlippedPairCount = selector({
  key: 'IncorrectFlipPairsCount',
  get: ({ get }) => {
    const matchedCount = get(tilesState).filter((t) => t.matched).length;
    return Math.floor((get(flipCountState) - matchedCount) / 2);
  },
});

export const isComplete = selector({
  key: 'Complete',
  get: ({ get }) => {
    return get(tilesState).filter((t) => !t.matched).length === 0;
  },
});
