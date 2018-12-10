import { FETCH_REQUEST_STARTED, FETCH_REQUEST_SUCCEEDED, FETCH_REQUEST_FAILED } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_REQUEST_STARTED:
    case FETCH_REQUEST_SUCCEEDED:
    case FETCH_REQUEST_FAILED:
      console.log(`${action.type}...`);
      return state;
    default:
      return state;
  }
}
