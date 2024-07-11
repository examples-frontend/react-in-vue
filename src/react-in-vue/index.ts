import React from 'react';
import { createRoot,  } from 'react-dom/client';
import App from '../react/App';

export default (container: unknown) => {
    const root = createRoot(container as Element);
    root.render(App() as React.ReactNode);
  
    return () => {
      root.unmount()
    }
}