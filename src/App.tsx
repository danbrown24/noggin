import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Game from './components/Game';
import Header from './components/Header';
import Instructions from './components/Instructions';
import Win from './components/Win';
import { isTestEnv, setBodyClass } from './lib';
import { initFirebase } from './lib/firebase';
import { instructionsOpenState, isComplete } from './store';
import './styles.scss';

if (!isTestEnv()) {
  initFirebase();
}
setBodyClass();

const App = () => {
  const [instructionsOpen] = useRecoilState(instructionsOpenState);
  const winOpen = useRecoilValue(isComplete);

  return (
    <>
      <Header />
      <Game />
      {instructionsOpen && <Instructions />}
      {winOpen && <Win />}
    </>
  );
};

const AppWrapper = () => {
  return (
    <div className="app">
      <React.Suspense fallback={<p>Failed to load :(</p>}>
        <App />
      </React.Suspense>
    </div>
  );
};

export default AppWrapper;
