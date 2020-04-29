import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootEl=document.getElementById('root');

//  all the route must be nested in a BrowserRouter
let render=()=>{
  ReactDOM.render(
  <Router >
  <App />
  </Router>
  , rootEl)
}

if(module.hot){
  module.hot.accept('./app/layout/App',()=>{
    setTimeout(render);
  })
}

render();





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
