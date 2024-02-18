import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { INITIAL_REVEAL_DURATION } from '../lib/game';
import { setStoredFirstRunDone } from '../lib/storage';
import { instructionsOpenState } from '../store';
import Modal from './Modal';

const Instructions = () => {
  const setInstructionsOpen = useRecoilState(instructionsOpenState)[1];

  const onClosed = useCallback(() => {
    setStoredFirstRunDone(true);
    setInstructionsOpen(false);
  }, [setInstructionsOpen]);

  return (
    <Modal onClose={onClosed}>
      <h2>How to Play</h2>
      <p className="">
        When you start the game you'll have {INITIAL_REVEAL_DURATION} seconds to memorise the positions of as many tiles
        as you can.
      </p>
      <p className="">Match all of the tiles in as few flips as possible. That's it!</p>
      <p className="">A new puzzle is released every day.</p>
    </Modal>
  );
};

export default Instructions;
