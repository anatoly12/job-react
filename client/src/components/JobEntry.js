import React, { PropTypes, Component } from 'react';
import { FlatButton, RaisedButton, Dialog, TextField } from 'material-ui';
import util from '../../lib/util';

const customContentStyle = {
  maxWidth: 600,
};

export default class JobEntry extends Component {
  constructor(props) {
    super(props);
    // TODO: Rename state to avoid duplication with JobEntry.jsx
    this.state = {
      open: false,
      boardName: '',
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      basicQualifications: '',
      preferredQualifications: '',
      location: '',
      jobUrl: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBoardName = this.handleBoardName.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
    this.handleJobDescriptionChange = this.handleJobDescriptionChange.bind(this);
    this.handleBasicQualificationsChange = this.handleBasicQualificationsChange.bind(this);
    this.handlePreferredQualificationsChange = this.handlePreferredQualificationsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleJobUrlChange = this.handleJobUrlChange.bind(this);
    this.onNewJobPostingSave = this.onNewJobPostingSave.bind(this);
  }

	// TODO: Rename handleOpen and handleClose functions to avoid duplication with JobEntry.jsx
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = (e) => {
    e.preventDefault();
		this.props.handleDialog();
	}

  handleBoardName = (e) => { this.setState({ boardName: e.target.value }) };
  handleCompanyNameChange = (e) => { this.setState({ companyName: e.target.value }) };
  handleJobTitleChange = (e) => { this.setState({ jobTitle: e.target.value }) };
  handleJobDescriptionChange = (e) => { this.setState({ jobDescription: e.target.value }) };
  handleBasicQualificationsChange = (e) => { this.setState({ basicQualifications: e.target.value }) };
  handlePreferredQualificationsChange = (e) => { this.setState({ preferredQualifications: e.target.value }) };
  handleLocationChange = (e) => { this.setState({ location: e.target.value }) };
  handleJobUrlChange = (e) => { this.setState({ jobUrl: e.target.value }) };
  
  onNewJobPostingSave = (e) => {
    e.preventDefault();
    util.submitNewJobPosting(this.state);
  }

  render() {
    const {open , handleDialog} = this.props;
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
        onTouchTap={handleDialog}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Job Info"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={open}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="Board"
            errorText="This field is required"
            floatingLabelText="Board Name"
            value={this.state.boardName}
            onChange={this.handleBoardName}
          /><br />
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
            value={this.state.jobTitle}
            onChange={this.handleJobTitleChange}
          /><br />
          <TextField
            hintText="Job Description"
            errorText="This field is required."
            floatingLabelText="Job Description"
            multiLine={true}
            value={this.state.jobDescription}
            onChange={this.handleJobDescriptionChange}
          /><br />
          <TextField
            hintText="Basic Qualifications"
            errorText="This field is required."
            floatingLabelText="Basic Qualifications"
            multiLine={true}
            value={this.state.basicQualifications}
            onChange={this.handleBasicQualificationsChange}
          /><br />     
          <TextField
            hintText="Preferred Qualifications"
            errorText="This field is required."
            floatingLabelText="Preferred Qualifications"
            multiLine={true}
            value={this.state.preferredQualifications}
            onChange={this.handlePreferredQualificationsChange}
          /><br />  
          <TextField
            hintText="Location"
            errorText="This field is required."
            floatingLabelText="Location"
            multiLine={true}
            value={this.state.location}
            onChange={this.handleLocationChange}
          /><br />  
          <TextField
            hintText="Job Url"
            errorText="This field is required"
            floatingLabelText="Job Url"
            value={this.state.jobUrl}
            onChange={this.handleJobUrlChange}
          /><br />
        </Dialog>
      </div>
    )
  }  
}
