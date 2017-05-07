export default function(state = [], action) {
  switch (action.type) {
  case 'FETCH_ENTRY':
    return action.payload;
  }
  return state;
}
