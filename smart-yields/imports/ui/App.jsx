/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import Post from './Post.jsx';

class App extends React.Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();

    Posts.insert({
      text,
      title,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });
    // Clear form
    this.refs.textInput.value = '';
  }

  renderPosts() {
    const that = this;
    return this.props.posts.map(posts => (
      <Post
        key={posts._id}
        post={posts}
        canEdit={that.props.currentUser ? true : false}
      />
    ));
  }

  render() {
    return (
      <div className="post-container">

        <AccountsUIWrapper />
        <h1>Smart Yields Custom CMS</h1>
        { this.props.currentUser ?
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
            <br />
            <input
              type="text"
              ref="titleInput"
              placeholder="Title of post"
            />
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new posts"
            />
            <button onClick={this.handleSubmit.bind(this)}>Save</button>
          </form> : ''
        }
        {this.renderPosts()}
        {this.props.yield}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
