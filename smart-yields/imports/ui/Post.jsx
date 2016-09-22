import React from 'react';

class Post extends React.Component{
  render(){
    return(
      <div className='post-text'>
        {this.props.post.text}
      </div>
    )
  }
}

export default Post