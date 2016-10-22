/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { Files } from '../api/files.js';
import { Meteor } from 'meteor/meteor';
import { Button, Navbar, PageHeader, DropdownButton, MenuItem, Clearfix, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AccountsUIWrapper from './components/AccountsUIWrapper.jsx';
import MyEditor from './TestEditor.jsx';

// Templates
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

// Components
// import AlloyEditorComponent from './AlloyEditor.jsx';
import DropzoneDemo from './components/dropzone.jsx';
import NewContentForm from './components/NewContentForm.jsx';
import Post from '/imports/ui/components/post/Post.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitPage = this.submitPage.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  handleSubmit(title, path, text, template) {
    Meteor.call('posts.insert', text, title, path, template);
  }

  submitPage(title, path, text, template, location, intOrder, parent) {
    Meteor.call('pages.insert', title, path, text, template, location, intOrder, parent);
  }

  uploadImg(title, path, altText){
    Meteor.call('files.insert', title, path, altText)
  }

  headerPageOrder() {
    let orderedPages = [];

    let lowest = 1;

    let that = this;

    let sortingAlg = function(){

      that.props.pages.forEach((page) => {
        if(lowest - 1 === that.props.pages.length){
          return
        }

        if(lowest == page.order){
          orderedPages.push(page);
          lowest += 1;
          sortingAlg();
        }
      })
    }

    sortingAlg();

    return orderedPages;
  }


  render() {
    return (
        <div className="wrapper">
            <Header pages={this.headerPageOrder()}/>
            <div className="post-container container">
              {
                this.props.currentUser
                ? <NewContentForm
                  handleSubmit={this.handleSubmit}
                  isValidInput={this.isValidInput}
                  submitPage={this.submitPage}
                  pages={this.props.pages}
                  posts={this.props.posts}
                  images={this.props.images}
                  imgHandler={this.uploadImg}
                  />
                : null
              }
              {this.props.yield}
            </div>
            <Footer />
        </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('pages');
  Meteor.subscribe('files');

  return {
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    images: Files.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
