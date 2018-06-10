import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
           
        </Route>
    </Router>,
  document.getElementById('root')
)