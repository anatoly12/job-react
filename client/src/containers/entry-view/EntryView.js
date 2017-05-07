import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaPlayer from '../../components/MediaPlayer';
import EntryTextDisplay from '../../components/EntryTextDisplay';

class EntryView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {match, entrySelected, fetchMedia} = this.props;
    return (
      <div>
        {entrySelected === null ? null :
          <div>
            <div className="entry-view">
              <EntryTextDisplay entry={entrySelected}/>
            </div>
            <MediaPlayer mediaSrc={fetchMedia} mediaType={entrySelected.entry_type}/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entrySelected: state.entrySelected,
    fetchMedia: state.fetchMedia
  };
};

export default connect(mapStateToProps, null)(EntryView);
