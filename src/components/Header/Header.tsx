import React from 'react';
import styled from 'styled-components';
import { useTelegram } from '../../hooks/useTelegram';

// ВАЖНО: Убедитесь, что эти SVG файлы есть в src/assets/flags/
// и что vite-plugin-svgr настроен
import { ReactComponent as AzFlag } from '/src/assets/flags/az.svg';
import { ReactComponent as UzFlag } from '../../assets/flags/uz.svg';
import { ReactComponent as TrFlag } from '../../assets/flags/tr.svg';
import { ReactComponent as PtFlag } from '../../assets/flags/pt.svg';
import { ReactComponent as SaFlag } from '../../assets/flags/sa.svg';

const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: var(--card-bg);
  position: sticky;
  top: 0;
  z-index: 10;
  height: 50px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
`;

const Title = styled.span`
  font-size: 14px;
  color: #aaa;
`;

const FlagsContainer = styled.div`
  display: flex;
  gap: 8px;
  svg {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #555;
  }
`;

const Header: React.FC = () => {
  const { onClose } = useTelegram();

  return (
    <HeaderBar>
      <CloseButton onClick={onClose}>Закрыть</CloseButton>
      <Title>мини-приложение</Title>
      <FlagsContainer>
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