import { a, useSpring } from '@react-spring/web';
import { ComponentProps } from 'react';
import { AiOutlineGift, AiOutlinePaperClip } from 'react-icons/ai';
import {
  IoAlarmOutline,
  IoBasketballOutline,
  IoBulbOutline,
  IoCartOutline,
  IoCutOutline,
  IoDiamondOutline,
  IoFishOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoKeyOutline,
  IoPizzaOutline,
  IoRocketOutline,
  IoStarOutline,
} from 'react-icons/io5';
import { TbQuestionMark } from 'react-icons/tb';
import { TbCat } from 'react-icons/tb';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GameState, Tile as TileType, tileTypesMap } from '../lib/game';
import {
  canFlipSelector,
  darkModeState,
  flipCountState,
  gameStateState,
  interactionEnabledState,
  tileByIdSelector,
} from '../store';

type IconType =
  | 'cat'
  | 'question'
  | 'present'
  | 'paperclip'
  | 'diamond'
  | 'rocket'
  | 'clock'
  | 'basketball'
  | 'bulb'
  | 'trolley'
  | 'scissors'
  | 'fishy'
  | 'house'
  | 'heart'
  | 'key'
  | 'pizza'
  | 'star';

const getIcon = (type: IconType, iconProps: ComponentProps<typeof TbCat>) => {
  switch (type) {
    case 'cat':
      return <TbCat {...iconProps} strokeWidth={1.5} />;
    case 'question':
      return <TbQuestionMark {...iconProps} strokeWidth={2} />;
    case 'present':
      return <AiOutlineGift {...iconProps} strokeWidth={0.1} />;
    case 'paperclip':
      return <AiOutlinePaperClip {...iconProps} strokeWidth={0.1} />;
    case 'diamond':
      return <IoDiamondOutline {...iconProps} strokeWidth={0.1} />;
    case 'rocket':
      return <IoRocketOutline {...iconProps} strokeWidth={1} />;
    case 'clock':
      return <IoAlarmOutline {...iconProps} strokeWidth={0.1} />;
    case 'basketball':
      return <IoBasketballOutline {...iconProps} strokeWidth={0.1} />;
    case 'bulb':
      return <IoBulbOutline {...iconProps} strokeWidth={0.1} />;
    case 'trolley':
      return <IoCartOutline {...iconProps} strokeWidth={0.1} />;
    case 'scissors':
      return <IoCutOutline {...iconProps} strokeWidth={0.1} />;
    case 'fishy':
      return <IoFishOutline {...iconProps} strokeWidth={0.1} />;
    case 'house':
      return <IoHomeOutline {...iconProps} strokeWidth={0.1} />;
    case 'heart':
      return <IoHeartOutline {...iconProps} strokeWidth={0.1} />;
    case 'key':
      return <IoKeyOutline {...iconProps} strokeWidth={0.1} />;
    case 'pizza':
      return <IoPizzaOutline {...iconProps} strokeWidth={0.1} />;
    case 'star':
      return <IoStarOutline {...iconProps} strokeWidth={0.1} />;
  }
};

const Tile = ({ id }: { id: TileType['tileId'] }) => {
  const [gameState] = useRecoilState(gameStateState);
  const [darkMode] = useRecoilState(darkModeState);
  const [tile, setTile] = useRecoilState(tileByIdSelector(id));
  const [, setInteractionEnabled] = useRecoilState(interactionEnabledState);
  const [, setFlipCount] = useRecoilState(flipCountState);
  const canFlip = useRecoilValue(canFlipSelector);

  const flipped = gameState === GameState.INITIAL_REVEAL || tile.matched || tile.active;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 1, tension: 500, friction: 100 },
    onRest: () => {
      // Delay enabling interaction again for a wee bit if this didn't produce a match
      setTimeout(() => setInteractionEnabled(true), !canFlip ? 300 : 0);
    },
  });
  const baseIconProps = { size: 30, color: darkMode ? '#eee' : '#000' };
  const tileType = tileTypesMap[tile.type] as IconType;

  const onClick = () => {
    if (canFlip && !flipped && !tile.matched) {
      setTile({ ...tile, active: !flipped });
      setInteractionEnabled(false);
      setFlipCount((curr) => curr + 1);
    }
  };

  return (
    <div className="tile" onClick={onClick} onKeyUp={onClick}>
      <a.div className="tile-front" style={{ opacity, transform, rotateY: '180deg' }}>
        {getIcon(tileType, baseIconProps)}
      </a.div>
      <a.div className="tile-back" style={{ opacity: opacity.to((o) => 1 - o), transform }} />
    </div>
  );
};

export default Tile;
