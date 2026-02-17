const getAnalyticsTarget = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window;
};

const trackWithProvider = (provider, eventName, properties) => {
  try {
    return provider(eventName, properties);
  } catch (err) {
    /* eslint-disable no-console */
    console.warn('Analytics provider failed', err);
    /* eslint-enable no-console */
  }
  return null;
};

const trackEvent = (eventName, properties = {}) => {
  if (!eventName) {
    return;
  }

  const payload = properties || {};
  const target = getAnalyticsTarget();

  if (!target) {
    return;
  }

  const { analytics, gtag, dataLayer, mixpanel } = target;

  if (analytics && typeof analytics.track === 'function') {
    trackWithProvider(analytics.track.bind(analytics), eventName, payload);
    return;
  }

  if (typeof gtag === 'function') {
    trackWithProvider((name, props) => gtag('event', name, props), eventName, payload);
    return;
  }

  if (dataLayer && typeof dataLayer.push === 'function') {
    dataLayer.push(Object.assign({ event: eventName }, payload));
    return;
  }

  if (mixpanel && typeof mixpanel.track === 'function') {
    trackWithProvider(mixpanel.track.bind(mixpanel), eventName, payload);
    return;
  }

  /* eslint-disable no-console */
  console.info('Analytics event', eventName, payload);
  /* eslint-enable no-console */
};

export default { trackEvent };
