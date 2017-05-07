import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Header from './Header'
import Home from './Home'
import Board from './JobBoard/Board';
import Call from './Call';
import JobCard from './JobCard';
import JobEntry from './JobEntry';
import FloatingButton from './FloatingButton';

class App extends Component {
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
        {/*<FloatingButton />*/}
      </MuiThemeProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
