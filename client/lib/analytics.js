import axios from 'axios';

const trackEvent = (name, data = {}) => {
  if (!name) {
    return Promise.resolve();
  }

  const payload = {
    name,
    data,
    timestamp: new Date().toISOString(),
  };

  return axios.post('/analytics/events', payload).catch((err) => {
    /* eslint-disable no-console */
    console.error('Analytics event failed to send', err);
    /* eslint-enable no-console */
  });
};

export default {
  trackEvent,
};
