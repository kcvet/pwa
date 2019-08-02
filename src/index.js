import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from './components/Dashboard';

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

 const swUrl = `/sw.js`;
 console.log('swUrl: ', swUrl);
 if ('serviceWorker' in navigator) {
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

