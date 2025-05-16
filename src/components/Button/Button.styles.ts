import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: var(--accent-green);
  color: #000;
  border: none;
  border-radius: var(--border-radius-md);
  padding: 10px 21px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 10px var(--glow-color-green), 0 0 20px var(--glow-color-green);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px var(--glow-color-green), 0 0 30px var(--glow-color-green), 0 0 5px #fff;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0 5px var(--glow-color-green);
  }
`;