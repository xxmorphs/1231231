// src/data/games.ts

// ВАЖНО: Убедитесь, что эти файлы существуют в src/assets/games/
import minesSpibeImg from '../assets/games/mines_spibe.png';
import minesTurboImg from '../assets/games/mines_turbo.png';
import bombucksImg from '../assets/games/bombucks.png';
import brawlPiratesImg from '../assets/games/brawl_pirates.png';
import royalMinesImg from '../assets/games/royal_mines.png';
import aviatorImg from '../assets/games/aviator.png';
// import luckyJetImg from '../assets/games/luckyjet.png'; // Пример для других игр
// import rocketQueenImg from '../assets/games/rocket_queen.png';
// import colorPredictionImg from '../assets/games/color_prediction.png';
// import penaltyShootImg from '../assets/games/penalty_shoot.png';
// import goalSpribeImg from '../assets/games/goal_spribe.png';
// import balloonImg from '../assets/games/balloon.png';
// import footballXImg from '../assets/games/football_x.png';


export interface Game {
  id: string;
  title: string;
  image: string; // Это будет URL или base64 строка из импорта
}

export const gamesData: Game[] = [
  { id: 'mines_spibe', title: 'MINES SPIBE', image: minesSpibeImg },
  { id: 'mines_turbo', title: 'MINES TURBO', image: minesTurboImg },
  { id: 'bombucks', title: 'BOMBUCKS', image: bombucksImg },
  { id: 'brawl_pirates', title: 'BRAWL PIRATES', image: brawlPiratesImg },
  { id: 'royal_mines', title: 'ROYAL MINES', image: royalMinesImg },
  { id: 'aviator', title: 'Aviator', image: aviatorImg },
  // { id: 'luckyjet', title: 'LUCKYJET', image: luckyJetImg },
  // { id: 'rocket_queen', title: 'ROCKET QUEEN', image: rocketQueenImg },
  // { id: 'color_prediction', title: 'COLOR PREDICTION', image: colorPredictionImg },
  // { id: 'penalty_shoot', title: 'PENALTY SHOOT', image: penaltyShootImg },
  // { id: 'goal_spribe', title: 'GOAL SPRIBE', image: goalSpribeImg },
  // { id: 'balloon', title: 'BALLOON', image: balloonImg },
  // { id: 'football_x', title: 'FOOTBALL X', image: footballXImg },
];