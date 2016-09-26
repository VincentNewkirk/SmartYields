/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import Post from './Post.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();
    const path = '/' + this.refs.pathInput.value.trim();

    Posts.insert({
      text,
      title,
      path,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });
    // Clear form
    this.refs.textInput.value = '';
    this.refs.titleInput.value = '';
    this.refs.pathInput.value = '';
  }

  render() {
    return (
      <div className="post-container">

        <AccountsUIWrapper />
        <h1>Smart Yields Custom CMS</h1>
        { this.props.currentUser ?
          <form className="new-post" onSubmit={this.handleSubmit} >
            <br />
            <input
              type="text"
              ref="titleInput"
              placeholder="Title of post"
            />
            <input
              type="text"
              ref="pathInput"
              placeholder="desired URL path"
            />
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new posts"
            />
            <button onClick={this.handleSubmit}>Save</button>
          </form> : null
        }
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
