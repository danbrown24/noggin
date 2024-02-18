import { useCallback, useEffect } from 'react';
import { BiSun } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { HiOutlineMoon } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { setBodyClass } from '../lib';
import { setStoredDarkMode } from '../lib/storage';
import { darkModeState, instructionsOpenState } from '../store';

const Header = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [instructionsOpen, setInstructionsOpen] = useRecoilState(instructionsOpenState);

  const onDarkModeClick = useCallback(() => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    setStoredDarkMode(newVal);
  }, [darkMode, setDarkMode]);

  const onHelpClick = useCallback(
    () => setInstructionsOpen(!instructionsOpen),
    [instructionsOpen, setInstructionsOpen],
  );

  useEffect(() => setBodyClass(darkMode), [darkMode]);

  return (
    <>
      <header className="header">
        <button type="button" className="header-button item" onClick={onHelpClick}>
          <FiHelpCircle size={24} color={darkMode ? '#fff' : '#222'} />
        </button>
        <h1 className="title">Noggin</h1>
        <button type="button" className="header-button item" onClick={onDarkModeClick}>
          {darkMode ? <BiSun size={24} color="#fff" /> : <HiOutlineMoon size={24} color="#222" />}
        </button>
      </header>
      <div className="header-separator" />
    </>
  );
};

export default Header;
