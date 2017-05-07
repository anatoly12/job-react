import React, { PropTypes, Component } from 'react';
import JobInfo from './JobInfo';
import sample from '../../../database/sampleData.js';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';

import InterviewTab from './InterviewTab';

const propTypes = {

};

const customContentStyle = {
  maxWidth: 600,
};

export default class JobCard extends Component {
	// TODO: Rename state to avoid duplication with JobEntry.jsx
	state = {
		open: false,
	};

	// TODO: Rename handleOpen and handleClose functions to avoid duplication with JobEntry.jsx
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
    const actions = [
			// TODO: Consider to take out cancel, or click shaded area to cancel
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
		return (
			<div>
        <RaisedButton label="Job Info" onTouchTap={this.handleOpen} />
        <Dialog
          title="Job Info"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
					This is JOB INFO component.
					<JobInfo sample={sample}/>
          <InterviewTab />
        </Dialog>
			</div>
		);
	}
};