/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { Meteor } from 'meteor/meteor';
import { Button, Navbar, PageHeader, DropdownButton, MenuItem, Clearfix, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import MenuTemplate from './menuTemplate.jsx';
import MyEditor from './TestEditor.jsx';

import NewContentForm from './NewContentForm.jsx';
import Post from './Post.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitPage = this.submitPage.bind(this);
    this.handleTab = this.handleTab.bind(this);
    //may or may not use this
    this.showNewContent = this.showNewContent.bind(this);
    this.state = {
      activeTab: "1",
    }
  }

  handleSubmit(title, path, text, template) {
      Meteor.call('posts.insert', text, title, path, template);
  }


  submitPage(title, path, text, template, location, intOrder, parent) {
    Meteor.call('pages.insert', title, path, text, template, location, intOrder, parent);
  }

  handleTab(event) {
    this.setState({ activeTab: event })
  }

  //may or may not use this
  showNewContent() {

  }

  render() {
    return (
      <div className="post-container container">

        <AccountsUIWrapper />
        <PageHeader>Smart Yields Custom CMS</PageHeader>
        <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleTab}>
          <NavItem eventKey="1" href="/">Home</NavItem>
          <NavItem eventKey="2" href="/posts">Posts</NavItem>
          <NavDropdown eventKey="3" title="Pages" id="nav-dropdown">
            <MenuItem href="pages-primary/">Primary</MenuItem>
            <MenuItem href="sidebar">Sidebar</MenuItem>
            <MenuItem href="footer">Footer</MenuItem>
          </NavDropdown>
        </Nav>
        <br />
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
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
