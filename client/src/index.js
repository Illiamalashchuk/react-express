import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './components/App';
import { Route, BrowserRouter } from 'react-router-dom'

render(
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>,
  document.getElementById('root')
)