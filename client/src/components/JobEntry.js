import React, { PropTypes, Component } from 'react';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import TextField from 'material-ui/TextField';

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
            hintText="Hint Text"
            errorText="This field is required"
          /><br />
          <TextField
            hintText="Hint Text"
            errorText="The error text can be as long as you want, it will wrap."
          /><br />
          <TextField
            hintText="Hint Text"
            errorText="This field is required"
            floatingLabelText="Floating Label Text"
          /><br />
          <TextField
            hintText="Message Field"
            errorText="This field is required."
            floatingLabelText="MultiLine and FloatingLabel"
            multiLine={true}
            rows={2}
          /><br />
        </Dialog>
      </div>
    )
  }  
}
