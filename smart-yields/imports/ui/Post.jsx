import React from 'react';
import { Posts } from '../api/posts.js'

class Post extends React.Component{

  deleteThisPost(){
    Posts.remove(this.props.post._id);
  }

  editThisPost(){

  }

  render(){
    console.log(this.props);
    return(
      <div className='post-text'>
        <strong>{this.props.post.username}</strong>: <br />
        {this.props.post.text}
        { this.props.canEdit ?
          <div className='owner-controls'>
            <div className='delete' onClick={this.deleteThisPost.bind(this)}>Delete</div>
            <div className='edit'>Edit</div>
          </div> : ''
        }
      </div>
    )
  }
}


export default Post