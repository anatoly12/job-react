import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';

const propTypes = {
  jobPost: PropTypes.object.isRequired,
};

export default JobInfo = (jobPost) => {
  const { comapny,
          job_title,
          job_description,
          basic_qualifications,
          preferred_qualifications,
          location,
          posted_date,
          posted_url,
        } = jobPost;
  return (
    <div>
      <h1>Title</h1>
      { job_title } at { company }
      <h1>Location</h1>
      { location }
      <h1>Description</h1>
      { job_description }
      <h1>Basic Qualifications</h1>
      { basic_qualifications }
      <h1>Preferred Qualifications</h1>
      { preferred_qualifications }
      <h1>Job Posting Url</h1>
      { post_url }
    </div>
  )
}
