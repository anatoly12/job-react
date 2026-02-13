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
      errors: {
        boardName: '',
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        basicQualifications: '',
        preferredQualifications: '',
        location: '',
        jobUrl: '',
      },
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

  handleBoardName = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      boardName: value,
      errors: { ...prevState.errors, boardName: '' },
    }));
  };

  handleCompanyNameChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      companyName: value,
      errors: { ...prevState.errors, companyName: '' },
    }));
  };

  handleJobTitleChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      jobTitle: value,
      errors: { ...prevState.errors, jobTitle: '' },
    }));
  };

  handleJobDescriptionChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      jobDescription: value,
      errors: { ...prevState.errors, jobDescription: '' },
    }));
  };

  handleBasicQualificationsChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      basicQualifications: value,
      errors: { ...prevState.errors, basicQualifications: '' },
    }));
  };

  handlePreferredQualificationsChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      preferredQualifications: value,
      errors: { ...prevState.errors, preferredQualifications: '' },
    }));
  };

  handleLocationChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      location: value,
      errors: { ...prevState.errors, location: '' },
    }));
  };

  handleJobUrlChange = (e) => {
    const value = e.target.value;
    this.setState(prevState => ({
      jobUrl: value,
      errors: { ...prevState.errors, jobUrl: '' },
    }));
  };

  validateFields = () => {
    const requiredFieldMessages = {
      boardName: 'This field is required',
      companyName: 'This field is required',
      jobTitle: 'This field is required',
      jobDescription: 'This field is required.',
      basicQualifications: 'This field is required.',
      preferredQualifications: 'This field is required.',
      location: 'This field is required.',
      jobUrl: 'This field is required',
    };

    const errors = { ...this.state.errors };
    let isValid = true;

    Object.keys(requiredFieldMessages).forEach((field) => {
      if ((this.state[field] || '').trim()) {
        errors[field] = '';
      } else {
        errors[field] = requiredFieldMessages[field];
        isValid = false;
      }
    });

    this.setState({ errors });
    return isValid;
  }

  handleSave = (e) => {
    e.preventDefault();
    if (!this.validateFields()) {
      return;
    }
    this.props.handleDialog();
    this.onNewJobPostingSave();
  }

  onNewJobPostingSave = () => {
    const {
      boardName,
      companyName,
      jobTitle,
      jobDescription,
      basicQualifications,
      preferredQualifications,
      location,
      jobUrl,
    } = this.state;

    util.submitNewJobPosting({
      boardName,
      companyName,
      jobTitle,
      jobDescription,
      basicQualifications,
      preferredQualifications,
      location,
      jobUrl,
    });
  }

  render() {
    const {open , handleDialog} = this.props;
    const { errors } = this.state;
    const actions = [
			// TODO: Consider to take out cancel, or click shaded area to cancel
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSave}
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
            errorText={errors.boardName}
            floatingLabelText="Board Name"
            value={this.state.boardName}
            onChange={this.handleBoardName}
          /><br />
          <TextField
            hintText="Company Name"
            errorText={errors.companyName}
            floatingLabelText="Company Name"
            value={this.state.companyName}
            onChange={this.handleCompanyNameChange}
          /><br />
          <TextField
            hintText="Job Title"
            errorText={errors.jobTitle}
            floatingLabelText="Job Title"
            value={this.state.jobTitle}
            onChange={this.handleJobTitleChange}
          /><br />
          <TextField
            hintText="Job Description"
            errorText={errors.jobDescription}
            floatingLabelText="Job Description"
            multiLine={true}
            value={this.state.jobDescription}
            onChange={this.handleJobDescriptionChange}
          /><br />
          <TextField
            hintText="Basic Qualifications"
            errorText={errors.basicQualifications}
            floatingLabelText="Basic Qualifications"
            multiLine={true}
            value={this.state.basicQualifications}
            onChange={this.handleBasicQualificationsChange}
          /><br />     
          <TextField
            hintText="Preferred Qualifications"
            errorText={errors.preferredQualifications}
            floatingLabelText="Preferred Qualifications"
            multiLine={true}
            value={this.state.preferredQualifications}
            onChange={this.handlePreferredQualificationsChange}
          /><br />  
          <TextField
            hintText="Location"
            errorText={errors.location}
            floatingLabelText="Location"
            multiLine={true}
            value={this.state.location}
            onChange={this.handleLocationChange}
          /><br />  
          <TextField
            hintText="Job Url"
            errorText={errors.jobUrl}
            floatingLabelText="Job Url"
            value={this.state.jobUrl}
            onChange={this.handleJobUrlChange}
          /><br />
        </Dialog>
      </div>
    )
  }  
}
