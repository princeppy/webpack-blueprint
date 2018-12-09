/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
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
    const { createPost } = this.props;
    const { title, body } = this.state;
    const post = { title, body };
    createPost(post);
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json; charset=UTF-8' },
    //   body: JSON.stringify(post)
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data));
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
  createPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { createPost }
)(PostForm);
