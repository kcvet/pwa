import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

const history = createBrowserHistory();

    ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById("root")
      );
      
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const swUrl = `/src/sw.js`;
if ('serviceWorker' in navigator) {
    console.log('navigator: ', navigator);
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swUrl)
        .then((reg) => {
          console.log('Service worker registered in scope.', reg)
        })
        .catch(function(err) {
          console.log("Service Worker Failed to Register", err);
      })
  });
}

