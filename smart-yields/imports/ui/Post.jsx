import React from 'react';
import { Posts } from '../api/posts.js'

class Post extends React.Component{
  deleteThisPost(){
    Posts.remove(this.props.post._id);
  }
  render(){
    console.log(this.props);
    return(
      <div className='post-text'>
        <strong>{this.props.post.username}</strong>: {this.props.post.text}
        <div className='delete' onClick={this.deleteThisPost.bind(this)}>Delete</div>
      </div>
    )
  }
}


export default Post