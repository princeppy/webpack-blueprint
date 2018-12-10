/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { cPost } = this.props;
    const { title, body } = this.state;
    const post = { title, body };
    cPost(post);
  }

  render() {
    const { title, body } = this.state;

    return (
      <div>
        <h1>Post Form</h1>
        <h2>Add Post</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='title'>
              Title :
              <input type='text' id='title' name='title' value={title} onChange={this.onChange} />
            </label>
          </div>
          <br />
          <div>
            <label htmlFor='body'>
              Body :
              <input type='text' id='body' name='body' value={body} onChange={this.onChange} />
            </label>
          </div>
          <br />
          <button type='submit'>Post</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  cPost: PropTypes.func.isRequired
};

export default connect(
  // eslint-disable-next-line no-unused-vars
  (state, ownProps) => ({
    //
  }),
  // eslint-disable-next-line no-unused-vars
  (dispatch, ownProps) =>
    bindActionCreators(
      {
        cPost: post => {
          // const { id } = ownProps
          dispatch(createPost(post));
        }
      },
      dispatch
    )
)(PostForm);
