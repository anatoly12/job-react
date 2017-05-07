import React, { PropTypes, Component } from 'react';
import { FlatButton, RaisedButton, Dialog, TextField } from 'material-ui';
import util from '../../lib/util';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

export default class JobEntry extends Component {
  constructor(props) {
    super(props);
    // TODO: Rename state to avoid duplication with JobEntry.jsx
    this.state = {
      open: false,
      companyName: '',
      job_title: '',
      job_description: '',
      basic_qualifications: '',
      preferred_qualifications: '',
      location: '',
      post_url: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.onNewJobPostingSave = this.onNewJobPostingSave.bind(this);
  }

	// TODO: Rename handleOpen and handleClose functions to avoid duplication with JobEntry.jsx
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = (e) => {
    e.preventDefault();
		this.setState({ open: false });
	}

  handleCompanyNameChange = (e) => {
    this.setState({ companyName: e.target.value });
  }

  onNewJobPostingSave = (e) => {
    e.preventDefault();
    util.submitNewJobPosting(this.state.companyName);
  }

  render() {
    const actions = [
			// TODO: Consider to take out cancel, or click shaded area to cancel
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={(e) => {
         this.handleClose(e);
         this.onNewJobPostingSave(e);
        }}
      />,
      <FlatButton
        label="Cancel"
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
            value={this.state.companyName}
            onChange={this.handleCompanyNameChange}
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
