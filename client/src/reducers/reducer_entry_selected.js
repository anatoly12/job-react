export default function(state = {}, action) {
  switch (action.type) {
  case 'ENTRY_SELECTED':
    return action.payload;
  }
  return state;
}
