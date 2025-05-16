import React from "react";
import styled from "styled-components";
import { useTelegram } from "../../hooks/useTelegram"; // Убедитесь, что этот хук работает и не вызывает ошибок

// ВАЖНО: Убедитесь, что эти SVG файлы есть в src/assets/flags/
// и что vite-plugin-svgr настроен
import { ReactComponent as AzFlag } from "/src/assets/flags/az.svg"; // Абсолютный путь от корня src
import { ReactComponent as UzFlag } from "../../assets/flags/uz.svg"; // Относительный путь
import { ReactComponent as TrFlag } from "../../assets/flags/tr.svg"; // Относительный путь
import { ReactComponent as PtFlag } from "../../assets/flags/pt.svg"; // Относительный путь
import { ReactComponent as SaFlag } from "../../assets/flags/sa.svg"; // Относительный путь

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: var(
    --card-bg
  ); /* Убедитесь, что эта CSS переменная определена в GlobalStyles */
  position: sticky;
  top: 0;
  z-index: 10;
  height: 50px; /* Убедитесь, что это соответствует вашему дизайну */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color); /* Убедитесь, что эта CSS переменная определена */
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
`;

const Title = styled.span`
  font-size: 14px;
  color: #aaa; /* Можно использовать var(--text-color-secondary) если определено */
`;

const FlagsContainer = styled.div`
  display: flex;
  gap: 8px;
  svg {
    /* Стили для импортированных SVG компонентов */
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #555; /* Можно использовать var(--border-color) */
  }
`;

const Header: React.FC = () => {
  const { onClose } = useTelegram(); // Предполагаем, что useTelegram работает

  return (
    <HeaderBar>
      <CloseButton onClick={onClose}>Закрыть</CloseButton>
      <Title>мини-приложение</Title>
      <FlagsContainer>
        {/* Порядок флагов как в вашем коде */}
        <UzFlag />
        <AzFlag />
        <TrFlag />
        <PtFlag />
        <SaFlag />
      </FlagsContainer>
    </HeaderBar>
  );
};

export default Header;
