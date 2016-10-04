/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { Meteor } from 'meteor/meteor';
import { Button, Navbar, PageHeader, DropdownButton, MenuItem } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import NewContentForm from './NewContentForm.jsx';
import Post from './Post.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
  }

  handleSubmit(event, title, path, text) {
    console.log(event);
    event.preventDefault();

    // Find the text field via the React ref
    // const text = this.refs.textInput.value.trim();
    // const title = this.refs.titleInput.value.trim();
    // const path = '/' + this.refs.pathInput.value.trim();
    // const template = this.state.selectedTemplate;

    //validate URL input doesn't contain special characters
    //or is already a path in use
    if(this.isValidInput(path)){
      this.props.posts.forEach((post) => {
        if(post.path === path){
          this.setState({ validPath: false });
          throw new Error('path already exists')
        }
      });
    }

    if(this.state.validPath){
      Meteor.call('posts.insert', text, title, path, template);
    }

    // Clear form
    // this.refs.textInput.value = '';
    // this.refs.titleInput.value = '';
    // this.refs.pathInput.value = '';
  }

  isValidInput(str) {
    let iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++) {
       if (iChars.indexOf(str.charAt(i)) != -1) {
           this.setState({ validPath: false });
           throw new Error('No special characters in input field')
       }
    return true;
    }
  }

  render() {
    console.log(this.props, 'App props')
    return (
      <div className="post-container container">

        <AccountsUIWrapper />
        <PageHeader>Smart Yields Custom CMS</PageHeader>
        {
          this.props.currentUser
          ? <NewContentForm
            handleSubmit={this.handleSubmit}
            isValidInput={this.isValidInput}
            />
          : null
        }
        {this.props.yield}
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
