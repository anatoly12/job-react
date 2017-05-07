import React from 'react';

export default class MediaPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.renderAudioPlayer = this.renderAudioPlayer.bind(this);
  }

  renderAudioPlayer(mediaSrc) {
    return (
      <div className='audio-player'>
        <audio src={mediaSrc} controls></audio>
      </div>
    );
  }

  render() {
    const {mediaSrc, mediaType} = this.props;
    console.log('from media player', mediaSrc);
    return (
      <div>
         {this.renderAudioPlayer(mediaSrc)}
      </div>
    );
  }
}
