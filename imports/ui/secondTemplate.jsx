import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import { Jumbotron }from 'react-bootstrap';
import Post from './Post.jsx';

class SecondTemplate extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="container">
          <Jumbotron>
            <h1>{this.props.title}</h1>
            <Post title={this.props.title}
            text={this.props.text}
            path={this.props.path}
            _id={this.props._id}
            />
          </Jumbotron>
        </div>
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
}, SecondTemplate);
