import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import './assets/styles/custom.scss';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes/>
    </>
  );
}

export default App;
