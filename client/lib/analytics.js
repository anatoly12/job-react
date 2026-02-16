const isAnalyticsAvailable = () => (
  typeof window !== 'undefined' &&
  window.analytics &&
  typeof window.analytics.track === 'function'
);

const trackJobApplicationSubmitted = (jobDetails = {}) => {
  if (!isAnalyticsAvailable()) {
    return;
  }

  const payload = {
    boardName: jobDetails.boardName,
    companyName: jobDetails.companyName,
    jobTitle: jobDetails.jobTitle,
    hasDescription: Boolean(jobDetails.jobDescription),
    hasBasicQualifications: Boolean(jobDetails.basicQualifications),
    hasPreferredQualifications: Boolean(jobDetails.preferredQualifications),
    hasLocation: Boolean(jobDetails.location),
    hasJobUrl: Boolean(jobDetails.jobUrl),
  };

  window.analytics.track('job_application_submitted', payload);
};

export default { trackJobApplicationSubmitted };
