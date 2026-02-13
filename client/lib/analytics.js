const isAnalyticsAvailable = () => (
  typeof window !== 'undefined' &&
  window.analytics &&
  typeof window.analytics.track === 'function'
);

const isProduction = () => (
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV === 'production'
);

const logFallback = (eventName, payload) => {
  if (typeof console !== 'undefined' && console.info && !isProduction()) {
    console.info(`[analytics] ${eventName}`, payload);
  }
};

const track = (eventName, payload = {}) => {
  if (isAnalyticsAvailable()) {
    window.analytics.track(eventName, payload);
  } else {
    logFallback(eventName, payload);
  }
};

const sanitizeJobDetails = (details = {}) => {
  const {
    boardName = null,
    companyName = null,
    jobTitle = null,
    location = null,
  } = details;

  return { boardName, companyName, jobTitle, location };
};

const trackJobPostingFlowOpened = (details) => (
  track('Job Posting Creation Opened', sanitizeJobDetails(details))
);

const trackJobPostingFlowSubmitted = (details) => (
  track('Job Posting Creation Submitted', sanitizeJobDetails(details))
);

const trackJobPostingFlowSucceeded = (details) => (
  track('Job Posting Creation Succeeded', sanitizeJobDetails(details))
);

const trackJobPostingFlowFailed = (error, details) => {
  const payload = Object.assign({
    message: error && error.message ? error.message : 'Unknown error',
  }, sanitizeJobDetails(details));

  track('Job Posting Creation Failed', payload);
};

const trackJobPostingFlowCancelled = (details) => (
  track('Job Posting Creation Cancelled', sanitizeJobDetails(details))
);

export default {
  track,
  trackJobPostingFlowOpened,
  trackJobPostingFlowSubmitted,
  trackJobPostingFlowSucceeded,
  trackJobPostingFlowFailed,
  trackJobPostingFlowCancelled,
};
