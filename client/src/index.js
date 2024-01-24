import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
  // <React.StrictMode>
  // </React.StrictMode>
);

/**
 * Remarque : si votre application crée deux connexions socket 
 * à chaque fois que vous chargez le côté client, cela est 
 * probablement lié au fait que create-react-app encapsule
 *  désormais le composant App dans un composant React.StrictMode 
 * pour aider à détecter les problèmes de développement. 
 * Malheureusement, cela entraîne le déclenchement du rappel 
 * d'état initial paresseux deux fois. Pour éviter cela, 
 * supprimez simplement le composant d'emballage dans index.js. 
 * Consultez le problème suivant sur GitHub : https://github.com/facebook/react/issues/15074 
 */


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
