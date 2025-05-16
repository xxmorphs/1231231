
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

// Если вы используете SVG не только как React компоненты, но и как URL
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />