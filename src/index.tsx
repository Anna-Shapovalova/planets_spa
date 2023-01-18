import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './styles/tailwind.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tw-elements';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Router>
    <App />
  </Router>,
);
