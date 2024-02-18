import { useCallback, useEffect, useState } from 'react';
import { BsShareFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { incorrectFlippedPairCount } from '../store';
import Modal from './Modal';

const SHARE_NOTIFICATION_DURATION = 2000;

const Win = () => {
  const [, setIsOpen] = useState(false);
  const [showShared, setShowShared] = useState(false);
  const badFlipCount = useRecoilValue(incorrectFlippedPairCount);

  /**
   * Side effect to flash the "copied to clipboard" message when the share button is clicked
   */
  useEffect(() => {
    const timeout = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const onShare = useCallback(async () => {
    setShowShared(true);
    setTimeout(() => setShowShared(false), SHARE_NOTIFICATION_DURATION);
    try {
      const resultText = `Noggin ${new Date().toLocaleString().slice(0, 5)}
${badFlipCount} bad flips.`;

      await navigator.clipboard.writeText(resultText);
    } catch (err) {
      console.error('Failed to copy results to clipboard: ', err);
    }
  }, [badFlipCount]);

  return (
    <Modal initialShowDelay={600} closeOnBackdropClick={false}>
      <h2 className="">Solved! 🎉</h2>
      {badFlipCount === 0 ? <div className="perfect" /> : null}
      <p>You solved it with {badFlipCount} bad flips!</p>
      <div className="share-container">
        {showShared ? (
          <div className="shared-text">Results copied to clipboard!</div>
        ) : (
          <button type="button" className="share-button" onClick={onShare}>
            <span>Share</span> <BsShareFill size={18} color="#fff" />
          </button>
        )}
      </div>
      <p className="">Come back tomorrow for a new puzzle!</p>
    </Modal>
  );
};

export default Win;
