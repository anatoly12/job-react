import axios from 'axios';

const ANALYTICS_ENDPOINT = '/analytics/track';

export const trackJobBoardEvent = (eventName, properties = {}) => {
  if (!eventName) {
    return Promise.resolve();
  }

  const payload = {
    eventName,
    properties,
    timestamp: new Date().toISOString()
  };

  return axios.post(ANALYTICS_ENDPOINT, payload)
    .catch((error) => {
      // Swallow analytics errors so they never block the UI.
      console.error('Analytics track failed', error);
    });
};

export default {
  trackJobBoardEvent
};
