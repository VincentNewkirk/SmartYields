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
    this.inputChange = this.inputChange.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
    this.state = {
      validPath: true,
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();
    const path = '/' + this.refs.pathInput.value.trim();

    if(this.isValidInput(this.refs.pathInput.value.trim())){
      this.props.posts.forEach((post) => {
        if(post.path === path){
          this.setState({ validPath: false });
          throw new Error('path already exists')
        }
      });
    }

    if(this.state.validPath){
      Posts.insert({
        text,
        title,
        path,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username,  // username of logged in user
      });
    }

    // Clear form
    this.refs.textInput.value = '';
    this.refs.titleInput.value = '';
    this.refs.pathInput.value = '';
  }

  isValidInput(str) {
    let iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    for (var i = 0; i < str.length; i++) {
       if (iChars.indexOf(str.charAt(i)) != -1) {
           this.setState({ validPath: false });
           throw new Error('No special characters in input field')
       }
    return true;
    }
  }


  inputChange() {
    this.setState({ validPath: true })
  }

  render() {
    return (
      <div className="post-container">

        <AccountsUIWrapper />
        <h1>Smart Yields Custom CMS</h1>
        { this.props.currentUser ?
          <form className="new-post" onSubmit={this.handleSubmit} >
            <br />
            <span>Title of your page</span><input
              type="text"
              ref="titleInput"
              placeholder="Awesome Page"
            /><br />
            <span>smartyields.com/</span><input
              type="text"
              ref="pathInput"
              placeholder="desired URL path"
              onChange={this.inputChange}
            />{this.state.validPath ?
                null
                : <span>Invalid URL. Specified URL may already be in use</span>
              }<br />
            <span>Body of your page</span><input
              type="text"
              ref="textInput"
              placeholder="'Hello! This is my page!'"
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
