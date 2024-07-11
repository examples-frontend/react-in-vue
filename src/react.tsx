import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './react/App';

const container = document.getElementById('root');

console.log('App', App);
console.log('App()', App());

const Page = () => {
  console.log('Rendered App', App);
  console.log('Rendered App()', App());

  return <><App /></>
}


// @ts-ignore
if (container) {
  const root = createRoot(container);
  root.render(<div><Page /></div>);
}
