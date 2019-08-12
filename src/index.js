import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from "./components/toast/Toast";
import Notify from './utils/Notification'

const history = createBrowserHistory();

    ReactDOM.render(
        <Router history={history}>
            <div>
              <App />
              <ToastContainer />
            </div>
        </Router>,
        document.getElementById("root")
      );
      
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

 const swUrl = `/sw.js`;
 if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register(swUrl)
         .then((reg) => {
          Notify("Web application is now ready for offline use", notifySuccess)
         })
        .catch(function(err) {
           console.log("Service Worker Failed to Register", err);
      })
   });
 }

