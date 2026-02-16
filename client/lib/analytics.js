const EVENT_NAMES = {
  JOB_VIEWED: 'Job Posting Viewed',
  JOB_APPLICATION: 'Job Application',
};

const isFunction = fn => typeof fn === 'function';
const isWindowAvailable = () => typeof window !== 'undefined';

const sanitizePayload = (payload = {}) => {
  return Object.keys(payload).reduce((acc, key) => {
    const value = payload[key];
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const extractJobDetails = job => {
  if (!job || typeof job !== 'object') {
    return {};
  }

  const jobId = job._id || job.id || job.jobId || null;

  return sanitizePayload({
    jobId,
    boardName: job.boardName,
    companyName: job.companyName,
    jobTitle: job.jobTitle,
    location: job.location,
    jobUrl: job.jobUrl,
  });
};

const trackEvent = (name, payload = {}) => {
  const data = sanitizePayload(payload);

  if (isWindowAvailable() && window.analytics && isFunction(window.analytics.track)) {
    window.analytics.track(name, data);
    return;
  }

  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${name}`, data);
  }
};

const trackJobViewed = (job, context = {}) => {
  trackEvent(EVENT_NAMES.JOB_VIEWED, {
    ...extractJobDetails(job),
    ...context,
  });
};

const trackJobApplication = (job, context = {}) => {
  trackEvent(EVENT_NAMES.JOB_APPLICATION, {
    ...extractJobDetails(job),
    ...context,
  });
};

export default {
  trackJobViewed,
  trackJobApplication,
};
