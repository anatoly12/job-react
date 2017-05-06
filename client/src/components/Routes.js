import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import Board from './Board';
import Call from './Call';

const Routes = () => (
  <Router>
    <Route exact path="/" component={App}/>
    <Route path="/board" component={Board}/>
    <Route path="/call" component={Call}/>
  </Router>
)

export default Routes;