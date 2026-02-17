const trackEvent = (name, properties = {}) => {
  if (!name) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  const analytics = window.analytics;
  if (analytics && typeof analytics.track === 'function') {
    analytics.track(name, properties);
  }
};

export { trackEvent };
export default trackEvent;
