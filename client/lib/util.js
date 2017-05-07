import axios from 'axios';

const submitNewJobPosting = (postDetails) => {
  return axios.post('/JobPosting', { params: { postDetails } });
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
    return final;
  })
  .catch(err => console.error(err.message));
}

export default { submitNewJobPosting, fetchJobPosting };
