import axios from 'axios';

const submitNewJobPosting = (postDetails) => {
  return axios.post('/storeJobPosting', {
    params: postDetails;
  });
}

export default { submitNewJobPosting };

