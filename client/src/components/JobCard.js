import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JobInfo from './JobInfo';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
// import sample from '../../../database/sampleData.js';

import InterviewTab from './InterviewTab';

const customContentStyle = {
  maxWidth: 600,
};

export default class JobCard extends Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		card: PropTypes.object.isRequired,
		handleDialog: PropTypes.func.isRequired,
	};
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
    const {open, card, handleDialog} = this.props;
    const actions = [
			// TODO: Consider to take out cancel, or click shaded area to cancel
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleDialog}
      />,
    ];
		return (
			<div>
        <Dialog
          title={`${card.companyName} | ${card.jobTitle}`}
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={open}
          autoScrollBodyContent={true}
        >
					<JobInfo card={card}/>
          <InterviewTab />
        </Dialog>
			</div>
		);
	}
};
