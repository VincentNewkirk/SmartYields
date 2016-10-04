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
    this.submitPage = this.submitPage.bind(this);
    this.state = {
      validPath: true,
    }
  }

  handleSubmit(title, path, text, template) {

    //validate URL input doesn't contain special characters
    //or is already a path in use
    if(this.isValidInput(path)){
      this.props.posts.forEach((post) => {
        if(post.path === path){
          this.setState({ validPath: false });
          throw new Error('path already exists')
        }
      });
      validPath = '/' + path
    }

    if(this.state.validPath){
      Meteor.call('posts.insert', text, title, validPath, template);
    }
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

  submitPage(title, path, text, template, location, order, parent) {
    if(this.isValidInput(path)){
      this.props.posts.forEach((post) => {
        if(post.path === path){
          this.setState({ validPath: false });
          throw new Error('path already exists')
        }
      });
      validPath = '/' + path
    }

    if(this.state.validPath){
      Meteor.call('pages.insert', text, title, validPath, template, location, order, parent);
    }
  }

  render() {
    return (
      <div className="post-container container">

        <AccountsUIWrapper />
        <PageHeader>Smart Yields Custom CMS</PageHeader>
        {
          this.props.currentUser
          ? <NewContentForm
            handleSubmit={this.handleSubmit}
            isValidInput={this.isValidInput}
            validPath={this.state.validPath}
            submitPage={this.submitPage}
            pages={this.props.pages}
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
  Meteor.subscribe('pages');

  return {
    pages: Pages.find({}).fetch(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
