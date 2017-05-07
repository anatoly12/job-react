import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers'

import Header from './Header'
import Home from './Home'
import Board from './JobBoard/Board';
import Call from './Call';
import JobCard from './JobCard';
import JobEntry from './JobEntry';
import EntryView from '../containers/entry-view/EntryView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingButton from './FloatingButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

const style = {
  position: 'absolute',
  right: 40,
  bottom: 40,
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
    this.handleDialog = this.handleDialog.bind(this);
  }

  componentWillMount () {
  }

  handleDialog() {
    this.setState({
      open: !this.state.open 
    });
  }

  render () {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router>
            <div>
              <Header />
              <FloatingActionButton 
                secondary={true} 
                style={style}
                onTouchTap={this.handleDialog}
                >
                <ContentAdd />
              </FloatingActionButton>
              <JobEntry open={this.state.open} handleDialog={this.handleDialog}/>
              <Route exact path="/" render={() => (
                <Redirect to="/board"/>
              )}/>
              <Route path="/board" component={Board}/>
              <Route path="/call" component={Call}/>
              <Route path="/job-card" component={JobCard}/>
              <Route path="/job-entry" component={JobEntry}/>
              <Route path="/entry/:id" component={EntryView} />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

              // <Route exact path="/" component={Home}/>
export default DragDropContext(HTML5Backend)(App);
