import React from 'react'; // Оставляем, так как React.FC используется
import { CardWrapper, GameImage, GameTitle } from './GameCard.styles';
import Button from '../Button/Button';
import type { Game } from '../../data/games'; // ИЗМЕНЕНО

interface GameCardProps {
  game: Game;
  onOpen: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onOpen }) => {
  return (
    <CardWrapper>
      <GameImage src={game.image} alt={game.title} />
      <GameTitle>{game.title}</GameTitle>
      <Button onClick={() => onOpen(game.id)}>OPEN</Button>
    </CardWrapper>
  );
};

export default GameCard;