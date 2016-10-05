import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import FirstTemplate from './firstTemplate.jsx';
import SecondTemplate from './secondTemplate.jsx';

class TemplateSelector extends React.Component {

  renderPosts() {
    if(this.props.post.template == 1) {
      return <FirstTemplate text={this.props.post.text} path={this.props.post.path} _id={this.props.post._id} title={this.props.post.title} />
    } else if(this.props.post.template == 2) {
      return <SecondTemplate text={this.props.post.text} path={this.props.post.path} title={this.props.post.title} _id={this.props.post._id} />
    }
  }

  render(){
    return(
      <div className="container">
        {this.props.post
          ?
            this.renderPosts()
          : null
        }
      </div>
    )
  }
}

export default createContainer((params) => {
  Meteor.subscribe('posts');
  const posts = Posts.find({}).fetch();
  //Filter posts to find one with matching path
  let post;
  console.log(params, 'PARAMS')
  posts.forEach((found) => {
    console.log(found.path)
    if(found.path === '/posts/' + params.pathLink) {
      post = found;
    }
  })
  return { post, currentUser: Meteor.user()};
}, TemplateSelector);