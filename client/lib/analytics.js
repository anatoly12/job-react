const getTracker = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.analytics && typeof window.analytics.track === 'function') {
    return (eventName, payload) => window.analytics.track(eventName, payload);
  }

  if (window.mixpanel && typeof window.mixpanel.track === 'function') {
    return (eventName, payload) => window.mixpanel.track(eventName, payload);
  }

  if (typeof window.gtag === 'function') {
    return (eventName, payload) => window.gtag('event', eventName, payload);
  }

  return null;
};

const trackEvent = (eventName, payload = {}) => {
  try {
    const tracker = getTracker();
    if (tracker) {
      tracker(eventName, payload);
      return;
    }

    if (typeof window !== 'undefined' && window.console && typeof window.console.info === 'function') {
      window.console.info(`[event] ${eventName}`, payload);
    }
  } catch (err) {
    if (typeof window !== 'undefined' && window.console && typeof window.console.error === 'function') {
      window.console.error('Unable to track event', eventName, err);
    }
  }
};

export default trackEvent;
export { trackEvent };
