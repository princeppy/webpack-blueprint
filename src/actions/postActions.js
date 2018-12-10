import {
  // FETCH_REQUEST_STARTED,
  // FETCH_REQUEST_SUCCEEDED,
  // FETCH_REQUEST_FAILED,
  FETCH_POST,
  NEW_POST
  //
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchPosts = () => dispatch => {
  dispatch({ type: 'FETCH_REQUEST_STARTED' });

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      dispatch({ type: 'FETCH_REQUEST_SUCCEEDED' });
      dispatch({
        type: FETCH_POST,
        payload: posts
      });
    })
    .catch(error => dispatch({ type: 'FETCH_REQUEST_FAILED', error: error }));
};

export const createPost = postData => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
