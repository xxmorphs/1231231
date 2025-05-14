import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-bg: #1a1a1a;
    --card-bg: #2a2a2a;
    --text-color: #f0f0f0;
    --accent-green: #00ff7f;
    --glow-color-green: rgba(0, 255, 127, 0.5);
    --border-radius-md: 12px;
    --border-radius-lg: 20px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--primary-bg);
    color: var(--text-color);
    overscroll-behavior: none;
    padding-top: env(safe-area-inset-top);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--card-bg);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--accent-green);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #00cc66;
  }
`;