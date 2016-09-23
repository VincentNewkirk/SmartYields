import React from 'react';
import { Posts } from '../api/posts.js';

class Post extends React.Component {

  deleteThisPost() {
    Posts.remove(this.props.post._id);
  }

  render() {
    return (
      <div className="post-text">
        <strong>{this.props.post.username}</strong>: {this.props.post.text}<br />
        { this.props.canEdit ?
          <div className="owner-controls">
            <button className="delete" onClick={this.deleteThisPost.bind(this)}>Delete</button>
          </div> : ''
        }
      </div>
    );
  }
}

export default Post;
