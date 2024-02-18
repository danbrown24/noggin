import { Tile } from './game';
import { getStoredDarkMode } from './storage';

const initialDarkMode = getStoredDarkMode();

export const setBodyClass = (newDarkMode = initialDarkMode) => {
  document.body.classList.toggle('dark-mode', newDarkMode);
};

export const shallowCopyTilesWithSplice = (tiles: Tile[], i: number, newTile: Tile, i2?: number, newTile2?: Tile) => {
  const secondAndRest = newTile2 && i2 ? [newTile2, ...tiles.slice(i2 + 1)] : [];
  return [...tiles.slice(0, i), newTile, ...tiles.slice(i + 1, i2), ...secondAndRest];
};

export const isTestEnv = () => process.env.JEST_WORKER_ID !== undefined;
