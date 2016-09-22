import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';

import Post from './Post.jsx';

class App extends React.Component{
  renderPosts(){
    return this.props.posts.map((posts) => (
      <Post key={posts._id} post={posts} />
    ))
  };

  render(){
    return (
      <div className='post-container'>
        {this.renderPosts()}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    posts: Posts.find({}).fetch(),
  };
}, App);