import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Call extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      prompt: 0,
      question: Math.floor(Math.random() * 3)
    };
  }

  render() {
    console.log(this.state);
    if (this.state.prompt === 1) {
      return (
        <div>
          <audio autoPlay='true' src={this.state.question + '.mp3'} controls></audio>
          <MuiThemeProvider>
            <RaisedButton
              label="Click here to record answer"
              onTouchTap={() => {
                let prompt = this.state.prompt;
                this.setState({
                  prompt: prompt+1
                });
              }}

            />
          </MuiThemeProvider>

        </div>

      );
    } else {
      return (
        <div>
          <h1>Ready for your question?</h1>
          <MuiThemeProvider>
            <RaisedButton
              label="Click here to begin"
              onTouchTap={() => {
                let prompt = this.state.prompt;
                this.setState({
                  prompt: prompt+1
                });
              }}
            />
          </MuiThemeProvider>
        </div>

      );
    }
  }
}
