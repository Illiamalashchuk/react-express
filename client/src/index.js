import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './components/App';
import { Switch, Route } from 'react-router-dom';

render(
    <Switch>
      <Route exact path='/' component={App}/>
    </Switch>,
  document.getElementById('root')
)