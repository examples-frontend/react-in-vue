import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleBabel from '../react/example';

export default (container: unknown) => {
    if (container) {
        const root = createRoot(container);
        root.render(ExampleBabel());
      }
      
    return () => unmountComponentAtNode(container)
}