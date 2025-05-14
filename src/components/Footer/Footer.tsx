import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGamepad, FaChartBar } from 'react-icons/fa';

const FooterBar = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 16px;
  background-color: var(--card-bg);
  position: sticky;
  bottom: 0;
  z-index: 10;
  height: 60px;
`;

// Типизируем props для isActive
const FooterIcon = styled.div<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? 'var(--accent-green)' : 'var(--text-color)')};
  font-size: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  svg {
    filter: ${(props) => (props.isActive ? 'drop-shadow(0 0 5px var(--glow-color-green))' : 'none')};
  }
  span {
    font-size: 10px;
  }
`;

const Footer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <FooterBar>
      <FooterIcon isActive={activeTab === 'games'} onClick={() => setActiveTab('games')}>
        <FaGamepad />
      </FooterIcon>
      <FooterIcon isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
        <FaChartBar />
      </FooterIcon>
    </FooterBar>
  );
};

export default Footer;