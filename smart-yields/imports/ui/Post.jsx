import React from 'react';
import { Posts } from '../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';

class Post extends React.Component {

  deleteThisPost() {
    Posts.remove(this.props.post._id);
  }

  render() {
    console.log(this.props)
    return (
      <div className="post-text">
        {this.props.post === undefined ? <p>Loading...</p> :
          <div className="post-container">
            <h3>{this.props.post.title}</h3>
            <div className="post-content">
              {this.props.post.text}
            </div>
          </div>
        }
        {this.props.currentUser ?
          <div className="owner-controls">
            <button className="delete" onClick={this.deleteThisPost.bind(this)}>Delete</button>
          </div> : ''
        }
        <a href='/'>Home</a>
      </div>
    );
  }
}

export default createContainer((params) => {
  const { id } = params;
  const subscription = Meteor.subscribe('posts', id);
  const loading = !subscription.ready();
  const post = Posts.findOne(id);
  return {loading, post, currentUser: Meteor.user()};
}, Post);

