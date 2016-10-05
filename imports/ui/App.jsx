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
    this.submitPage = this.submitPage.bind(this);
  }

  handleSubmit(title, path, text, template) {
      Meteor.call('posts.insert', text, title, path, template);
  }


  submitPage(title, path, text, template, location, intOrder, parent) {
    Meteor.call('pages.insert', title, path, text, template, location, intOrder, parent);
  }

  render() {
    return (
      <div className="post-container container">

        <AccountsUIWrapper />
        <PageHeader>Smart Yields Custom CMS</PageHeader>
        <a href="/posts">Posts</a>
        {
          this.props.currentUser
          ? <NewContentForm
            handleSubmit={this.handleSubmit}
            isValidInput={this.isValidInput}
            submitPage={this.submitPage}
            pages={this.props.pages}
            posts={this.props.posts}
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
