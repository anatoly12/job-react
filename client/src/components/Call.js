import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import VoiceRecognition from './VoiceRecognition';
import RecordRTC from 'recordrtc';
import axios from 'axios';

export default class Call extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      prompt: 0,
      question: Math.floor(Math.random() * 3),
      start: false
    };
  }


  componentDidMount() {
    this.props._detectMobileUser();
    this.getUserMedia();
  }

  getUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      this.captureUserMedia( stream => this.handleAudio(stream));
    } else {
      console.log('getUserMedia not supported');
    }
  }

  captureUserMedia(callback) {
    const constraints = {
      video: false,
      audio: true,
    };

    navigator.getUserMedia( constraints, callback, err => this.audioError(err));
  }

  handleAudio(stream) {
    this.setState({
      src: window.URL.createObjectURL(stream),
      stream: stream
    });
  }

  audioError(err) {
    alert('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.');
  }


  startRecord() {
    this.getUserMedia();
    this.captureUserMedia( stream => {
      this.state.recordAudio = RecordRTC(stream, {type: 'audio'});
      this.state.recordAudio.startRecording();
    });

    setTimeout( () => {
      this.stopRecord();
    }, 30000);
    this.setState({
      start: true,
      transcript: '',
      uploadError: false,
      uploadSuccess: false,
      noTranscript: false
    });
  }

  stopRecord() {
    this.state.recordAudio.stopRecording((audioURL) => {
      this.setState({
        blob: this.state.recordAudio.blob,
        src: audioURL,
        stop: true
      });
    });
  }

  uploadAudio() {
    this.setState({
      uploading: true,
      uploadError: false,
      uploadSuccess: false
    });
    let blob = this.state.blob;
    let fd = new FormData();
    fd.append('media', blob);
    fd.append('entryType', 'audio');
    fd.append('text', this.state.transcript);
    fd.append('user_id', localStorage.user_id);
    fd.append('phonenumber', JSON.parse(localStorage.smsCred).phoneNumber.number);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    axios.post('/entry', fd, config)
    .then( res => {
      this.setState({
        uploading: false,
        uploadSuccess: true,
        uploadError: false,
        transcript: '' });
    })
    .catch(err => {
      this.setState({
        uploading: false,
        uploadSuccess: false,
        uploadError: true
      });
    });
  }

  onEnd() {
    if (this.state.transcript.length > 0) {
      this.setState({
        start: false,
        stop: false
      });
    } else {
      this.setState({
        start: false,
        stop: false,
        noTranscript: true
      });
    }
  }

  onResult ({ finalTranscript }) {
    this.setState({
      start: false,
      transcript: finalTranscript
    });
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
    } else if (this.state.prompt === 2) {
      return (
        <div>

          {this.state.start &&
            <VoiceRecognition
              onEnd={this.onEnd}
              onResult={this.onResult}
              continuous={true}
              lang="en-US"
              stop={this.state.stop}
            />}
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
