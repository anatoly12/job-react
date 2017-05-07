export default function(state = '', action) {
  switch (action.type) {
  case 'FETCH_MEDIA':
    return action.payload;
  }
  return state;
}
