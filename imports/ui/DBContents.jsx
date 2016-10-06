import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';

class DBContents extends React.Component {
  constructor() {
    super();
    this.renderPosts = this.renderPosts.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  renderPosts() {
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
          {
            this.props.posts
            ? this.renderPosts()
            : 'No posts'
          }
          <h3>Pages</h3>
          {
            this.props.pages
            ? this.renderPages()
            : 'No Pages'
          }
      </div>
    )
  }
}

export default DBContents;
