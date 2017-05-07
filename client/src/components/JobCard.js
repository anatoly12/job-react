import React, { PropTypes, Component } from 'react';
import JobInfo from './JobInfo';
<<<<<<< HEAD
import jobPost from '../../../database/sampleData.js';
||||||| merged common ancestors
import jobPost from './sampleData.js';
=======
import jobPost from '../../../database/sampleData';
// import jobPost from './sampleData.js';
>>>>>>> (fix) Fix merge routes
import { FlatButton, RaisedButton, Dialog } from 'material-ui/Dialog';

const propTypes = {

};

const customContentStyle = {
	// TODO: Discuss with team to check what style we want
  width: '100%',
  maxWidth: 'none',
};

export default class JobCard extends Component {
	// TODO: Rename state to avoid duplication with JobEntry.jsx
	state = {
		open: false,
	};

	// TODO: Rename handleOpen and handleClose functions to avoid duplication with JobEntry.jsx
	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
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
        >
					This is JOB INFO component.
					<JobInfo jobPost={jobPost}/>
        </Dialog>
			</div>
		);
	}
};
