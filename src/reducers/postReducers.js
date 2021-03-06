import { FETCH_POST, NEW_POST } from '../actions/types';

const initialState = {
  items: [],
  itme: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      console.log(`${action.type}...`);
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      console.log(`${action.type}...`);
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
