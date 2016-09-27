import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';

class Tags extends React.Component {

  renderTags() {
    return this.props.posts.map(posts => (
      <div className="a-tags" key={posts._id}>
        <a href={posts.path + '/' + posts._id}>{posts.title}</a><br />
      </div>
    ));
  }

  render() {
    return (
      <div className='tag-container'>
        {this.renderTags()}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, Tags);