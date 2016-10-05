import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';

class Tags extends React.Component {
  constructor() {
    super();
    this.renderTags = this.renderTags.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  renderTags() {
    return this.props.posts.map(posts => (
      <div className="a-tags" key={posts._id}>
        <a href={posts.path}>{posts.title}</a><br />
      </div>
    ));
  }

  renderPosts() {
    console.log(this.props);
    return this.props.posts.map(post => (
      <ul key={post._id}>
        <li><h4>{post.title}</h4></li>
        <li><h5>{post.text}</h5></li>
        <li>Template: {post.template}</li>
        <li>Path: {post.path}</li>
      </ul>
    ));
  }

  renderPages() {
    return this.props.pages.map(page => (
      <ul key={page._id}>
        <li><h4>{page.title}</h4></li>
        <li><h5>{page.text}</h5></li>
        <li>Template: {page.template}</li>
        <li>Path: {page.path}</li>
        <li>Order: {page.order}</li>
        <li>Menu: {page.menu}</li>
        <li>Parent: {page.parent}</li>
      </ul>
    ));
  }

  render() {
    return (
      <div id="page-post-content">
          <h3>Posts</h3>
          {this.renderPosts()}
          <h3>Pages</h3>
          {this.renderPages()}
      </div>
    )
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
}, Tags);