import React from 'react';
import { ToastContainer } from 'react-toastify';
import background from "./assets/images/background.jpg";
import 'bootstrap/dist/css/bootstrap.css';


import Routes from './routes';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app-container' style={{ backgroundImage: `url(${background})` }}>
      <ToastContainer/>
      <Routes/>
    </div>
  );
}

export default App;
