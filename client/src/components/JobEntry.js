import React, { PropTypes, Component } from 'react';
import { FlatButton, RaisedButton, Dialog, TextField } from 'material-ui';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

export default class JobEntry extends Component {
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
	}

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
        <RaisedButton label="Save Job Posting" onTouchTap={this.handleOpen} />
        <Dialog
          title="Job Info"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <TextField
            hintText="Company Name"
            errorText="This field is required"
            floatingLabelText="Company Name"
          /><br />
          <TextField
            hintText="Job Title"
            errorText="This field is required"
            floatingLabelText="Job Title"
          /><br />
          <TextField
            hintText="Job Description"
            errorText="This field is required."
            floatingLabelText="Job Description"
            multiLine={true}
          /><br />
          <TextField
            hintText="Job Url"
            errorText="This field is required"
            floatingLabelText="Job Url"
          /><br />
        </Dialog>
      </div>
    )
  }  
}
