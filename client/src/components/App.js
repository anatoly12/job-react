import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    return (
      <MuiThemeProvider>
        <Header />
      </MuiThemeProvider>
    )
  }
}