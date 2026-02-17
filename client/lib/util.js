import axios from 'axios';

const trackEvent = (eventName, properties = {}) => {
  if (
    typeof window !== 'undefined' &&
    window.analytics &&
    typeof window.analytics.track === 'function'
  ) {
    window.analytics.track(eventName, properties);
  }
};

const submitNewJobPosting = (postDetails) => {
  return axios.post('/JobPosting', { params: { postDetails } })
    .then((response) => {
      trackEvent('Job Posting Created', {
        boardName: postDetails.boardName,
        companyName: postDetails.companyName,
        jobTitle: postDetails.jobTitle,
      });
      return response;
    })
    .catch((error) => {
      trackEvent('Job Posting Create Failed', {
        message: error.message,
      });
      throw error;
    });
}

const fetchJobPosting = (userInfo) => {
  // return axios.get('/JobPosting', { params: { userInfo } });
  return axios.get('/JobPosting')
  .then( result => {
    
    let list = {};
    let final = [];
    
    result.data.map( job => {
      list[job.boardName] = list[job.boardName] || { header: job.boardName, cards: []}
      list[job.boardName].cards.push(job)
    })

    for (let key in list) {
      final.push(list[key]);
    }
    trackEvent('Job Board Loaded', {
      boardCount: final.length,
      cardCount: result.data.length,
    });
    return final;
  })
  .catch(err => console.error(err.message));
}

export default { submitNewJobPosting, fetchJobPosting, trackEvent };
