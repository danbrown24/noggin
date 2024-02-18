import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { shallowCopyTilesWithSplice } from '../lib';
import { GameState, INITIAL_REVEAL_DURATION, TILE_ROW_COUNT, Tile as TileType } from '../lib/game';
import { gameStateState, incorrectFlippedPairCount, interactionEnabledState, tilesState } from '../store';
import Tile from './Tile';

const Game = () => {
  const [tiles, setTiles] = useRecoilState(tilesState);
  const incorrectFlippedPairs = useRecoilValue(incorrectFlippedPairCount);
  const canFlip = useRecoilValue(interactionEnabledState);
  const [gameState, setGameState] = useRecoilState(gameStateState);
  const [remainingRevealTime, setRemainingRevealTime] = useState(0);
  const isNotStarted = gameState === GameState.NOT_STARTED;

  useEffect(() => {
    const unmatchedActiveTiles = tiles.filter((t) => t.active && !t.matched);

    if (unmatchedActiveTiles.length === 2) {
      const first = unmatchedActiveTiles[0];
      const second = unmatchedActiveTiles[1];
      const setMatched = (t: TileType, matched: boolean) => ({ ...t, active: false, matched: matched });

      if (unmatchedActiveTiles[0].type === unmatchedActiveTiles[1].type) {
        // It's a match!
        const newTiles = shallowCopyTilesWithSplice(
          tiles,
          tiles.indexOf(first),
          setMatched(first, true),
          tiles.indexOf(second),
          setMatched(second, true),
        );
        setTiles(newTiles);
      } else if (canFlip) {
        // No match, reset the active unmatched tiles
        const newTiles = shallowCopyTilesWithSplice(
          tiles,
          tiles.indexOf(first),
          setMatched(first, false),
          tiles.indexOf(second),
          setMatched(second, false),
        );
        setTiles(newTiles);
      }
    }
  }, [setTiles, tiles, canFlip]);

  const startGame = useCallback(() => {
    setGameState(GameState.INITIAL_REVEAL);

    // Generate a second-by-second countdown in the UI
    let count = INITIAL_REVEAL_DURATION;
    setRemainingRevealTime(count);

    const counterInterval = setInterval(() => {
      count--;
      setRemainingRevealTime(count);

      if (count <= 0) {
        clearInterval(counterInterval);
        setGameState(GameState.STARTED); // Go!
      }
    }, 1000);
  }, [setGameState]);

  const renderedTiles = useMemo(() => {
    const renderTilesRow = (row: number) =>
      tiles
        .slice(row * TILE_ROW_COUNT, row * TILE_ROW_COUNT + TILE_ROW_COUNT)
        .map((tile) => <Tile id={tile.tileId} key={tile.tileId} />);
    return Array.from(Array(Math.ceil(tiles.length / 5))).map((val, row) => (
      <div key={`tile-row${row}`}>{renderTilesRow(row)}</div>
    ));
  }, [tiles]);

  return (
    <div className="content">
      <div className={classNames('game', isNotStarted && 'not-started')}>
        <div className="info-bar">
          {remainingRevealTime ? <div className="reveal-count">Starting in: {remainingRevealTime}s</div> : <div />}
          <div className="flip-count">Bad pairs: {(incorrectFlippedPairs < 10 ? '0' : '') + incorrectFlippedPairs}</div>
        </div>
        <div className="tile-cont">
          {renderedTiles}
          {isNotStarted && (
            <div className="start-overlay">
              <button type="button" className="share-button" onClick={startGame}>
                <span>Start</span> <FaPlay size={12} color="#fff" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
