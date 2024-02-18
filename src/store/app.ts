import { atom } from 'recoil';
import { getStoredDarkMode, getStoredFirstRunDone } from '../lib/storage';

export const darkModeState = atom({
  key: 'DarkMode',
  default: getStoredDarkMode(),
});

export const instructionsOpenState = atom({
  key: 'InstructionsOpen',
  default: !getStoredFirstRunDone(),
});
