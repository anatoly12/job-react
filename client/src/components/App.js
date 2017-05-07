import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Board from './Board';
import Call from './Call';
import JobCard from './JobCard';
import JobEntry from './JobEntry';

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
          <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/board" component={Board}/>
            <Route path="/call" component={Call}/>
            <Route path="/job-card" component={JobCard}/>
            <Route path="/job-entry" component={JobEntry}/>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
