import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';

const propTypes = {
  card: PropTypes.object.isRequired,
};

const JobInfo = ({card}) => {
  return (
    <div className="job-info">
      <h1>Title</h1>
      { card.jobTitle } at { card.companyName }
      <h1>Location</h1>
      { card.location }
      <h1>Description</h1>
      { card.jobDescription }
      <h1>Basic Qualifications</h1>
      { card.basicQualifications }
      <h1>Preferred Qualifications</h1>
      { card.preferredQualifications }
      <h1>Job Posting Url</h1>
      { card.jobUrl }
    </div>
  )
}

export default JobInfo;
