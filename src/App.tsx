import { useEffect } from 'react'; // ИЗМЕНЕНО: убран 'React' если не используется как переменная
import styled from 'styled-components';
import { useTelegram } from './hooks/useTelegram';
import GameListScreen from './screens/GameListScreen';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// ... остальной код компонента ...
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--primary-bg);
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
`;

function App() { // Заметьте: если это функциональный компонент, 'React.FC' не обязателен, но можно оставить
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      const primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim();
      if (primaryBg) {
        tg.setBackgroundColor(primaryBg);
      }
    }
  }, [tg]);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <GameListScreen />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;