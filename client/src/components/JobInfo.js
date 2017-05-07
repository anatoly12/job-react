import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';

const propTypes = {
  sample: PropTypes.object.isRequired,
};

const JobInfo = (sample) => {
  const { company,
          job_title,
          job_description,
          basic_qualifications,
          preferred_qualifications,
          location,
          posted_date,
          post_url,
        } = sample.sample.sampleJob1;
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

export default JobInfo;
