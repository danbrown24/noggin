export enum StorageKey {
  DARK_MODE = 'darkMode',
  FIRST_RUN_DONE = 'firstRunDone',
  SOLUTIONS = 'solutions',
}

export const getStoredDarkMode = () => localStorage.getItem(StorageKey.DARK_MODE) === 'true';
export const setStoredDarkMode = (darkMode: boolean) => localStorage.setItem(StorageKey.DARK_MODE, darkMode.toString());

export const getStoredFirstRunDone = () => localStorage.getItem(StorageKey.FIRST_RUN_DONE) === 'true';
export const setStoredFirstRunDone = (done: boolean) =>
  localStorage.setItem(StorageKey.FIRST_RUN_DONE, done.toString());
