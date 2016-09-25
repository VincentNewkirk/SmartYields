import React from 'react';
import { Posts } from '../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';

class Post extends React.Component {

  deleteThisPost() {
    Posts.remove(this.props.post._id);
  }


        // <h3>{this.props.post.title}</h3><br />
        // <strong>{this.props.post.username}</strong>: {this.props.post.text}<br />
  render() {
    console.log(this.props);
    return (
      <div className="post-text">
        { this.props.canEdit ?
          <div className="owner-controls">
            <button className="delete" onClick={this.deleteThisPost.bind(this)}>Delete</button>
          </div> : ''
        }
        {this.props.post === undefined ? <p>Loading...</p> : this.props.post.title}
      </div>
    );
  }
}

export default createContainer((params) => {
  const { id } = params;
  const subscription = Meteor.subscribe('posts', id);
  const loading = !subscription.ready();
  const post = Posts.findOne(id);
  return {loading, post};
}, Post);

