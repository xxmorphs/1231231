import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  aspect-ratio: 3 / 4;
  justify-content: space-between;
`;

export const GameImage = styled.img`
  width: 100%;
  max-height: 120px;
  object-fit: contain;
  border-radius: var(--border-radius-md);
  margin-bottom: 12px;
`;

export const GameTitle = styled.h3`
  font-size: 1em;
  color: var(--text-color);
  margin-bottom: 12px;
  min-height: 2.4em;
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Для многострочного обрезания, если очень нужно и готовы к нюансам */
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
`;