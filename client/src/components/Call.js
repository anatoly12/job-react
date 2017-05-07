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
      start: false,
      src: null,
      recordAudio: null,
      blob: null,
      stop: false,
      transcript: '',
      stream: null
    };

    this.getUserMedia = this.getUserMedia.bind(this);
    this.captureUserMedia = this.captureUserMedia.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
    this.audioError = this.audioError.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.uploadAudio = this.uploadAudio.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResult = this.onResult.bind(this);
  }


  componentDidMount() {
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
    let blob = this.state.blob;
    let fd = new FormData();
    fd.append('media', blob);
    fd.append('text', this.state.transcript);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    axios.post('/entry', fd, config)
    .then( res => {
      console.log('Successful upload!');
    })
    .catch(err => {
      console.log('Error uploading...');
    });
  }

  onEnd() {
    this.setState({
      start: false,
      stop: false
    });
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
                this.startRecord();
              }}

            />
          </MuiThemeProvider>

        </div>

      );
    } else if (this.state.prompt === 2) {
      return (
        <div>
          <audio autoPlay='true' src={this.state.src} muted="muted" controls></audio>
          <MuiThemeProvider>
            <RaisedButton
              label="Stop"
              onTouchTap={this.stopRecord}
            />

          </MuiThemeProvider>
          <MuiThemeProvider>
            <RaisedButton
              label="Upload"
              onTouchTap={this.uploadAudio}
            />
          </MuiThemeProvider>
            {this.state.start &&
              <VoiceRecognition
                onEnd={this.onEnd}
                onResult={this.onResult}
                continuous={true}
                lang="en-US"
                stop={this.state.stop}
              />}
          <p>{this.state.transcript}</p>
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
