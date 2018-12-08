/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
// import { Prototype } from 'prop-types';

// import PropTypes from 'prop-types';
const HomeComponent = props => {
  const { dispatch, post } = props;
  return (
    <React.Fragment>
      <h1>Home Component!</h1>
      <button onClick={() => dispatch({ type: 'DELETE_POST', id: post.id })}>Delete</button>
    </React.Fragment>
  );
};

// HomeComponent.prototype={
//     dispatch=Prototype.
// }

// const mapStateToProps = state => ({ posts: state });
// export default connect(mapStateToProps)(HomeComponent);
export default connect(state => ({
  posts: state
}))(HomeComponent);
