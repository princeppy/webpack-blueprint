/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPosts } from '../../actions/postActions';
import PostForm from './PostForm';

class Posts extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-unused-vars
    const { fetchPostsOnLoad } = this.props;
    fetchPostsOnLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      const { posts } = this.props;
      posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const { posts } = this.props;
    const postItem = posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        <PostForm />
        <h1>Posts</h1>
        {postItem}
      </div>
    );
  }
}

Posts.prototypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPostsOnLoad: fetchPosts
    },
    dispatch
  );

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
