import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import ExampleBabel from './react/example';

const container = document.getElementById('root');

// @ts-ignore
if (container) {
  const root = createRoot(container);
  root.render(<div><ExampleBabel /></div>);
}
