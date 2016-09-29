import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import TestTemplate from './testTemplate.jsx';
import SecondTemplate from './secondTemplate.jsx';

class TemplateSelector extends React.Component {

  renderPosts() {
    if(this.props.post.template == 1) {
    console.log('FIRED')
      return <TestTemplate text={this.props.post.text} path={this.props.post.path} _id={this.props.post._id} title={this.props.post.title} />
    } else if(this.props.post.template == 2) {
      return <SecondTemplate text={this.props.post.text} path={this.props.post.path} title={this.props.post.title} _id={this.props.post._id} />
    }
  }

  render(){
    console.log(this.props)
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
  const subscription = Meteor.subscribe('posts');
  const posts = Posts.find({}).fetch();
  //Filter posts to find one with matching path
  let post;
  posts.forEach((found) => {
    if(found.path === '/' + params.pathLink) {
      post = found;
    }
  })
  return { post, currentUser: Meteor.user()};
}, TemplateSelector);