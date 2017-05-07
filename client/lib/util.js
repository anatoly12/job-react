import axios from 'axios';

const submitNewJobPosting = (postDetails) => {
  return axios.post('/JobPosting', { params: { postDetails } });
}

const fetchJobPosting = (userInfo) => {
  // return axios.get('/JobPosting', { params: { userInfo } });
  return axios.get('/JobPosting')
  .then( result => {
    
    let list = {
      cards: []
    };
    
    result.data.map( posting => {
      // list.header = posting.header;
      // delete posting.header;
      list.cards.push(posting)
    })
    return [list];
  })
  .catch(err => console.error(err.message));
}

export default { submitNewJobPosting, fetchJobPosting };
