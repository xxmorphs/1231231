import React from 'react'; // Оставляем, так как React.FC используется
import styled from 'styled-components';
import GameCard from '../components/GameCard/GameCard';
import { gamesData } from '../data/games';
import type { Game } from '../data/games'; // ИЗМЕНЕНО
import { useTelegram } from '../hooks/useTelegram';

// ... остальной код компонента ...

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

const GameListScreen: React.FC = () => {
  const { tg } = useTelegram();

  const handleOpenGame = (gameId: string) => {
    console.log(`Opening game: ${gameId}`);
    const game = gamesData.find((g: Game) => g.id === gameId);
    tg.showAlert(`Вы хотите открыть игру: ${game?.title || gameId}`);
  };

  return (
    <GridContainer>
      {gamesData.map((game: Game) => (
        <GameCard key={game.id} game={game} onOpen={handleOpenGame} />
      ))}
    </GridContainer>
  );
};

export default GameListScreen;