import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import { Jumbotron }from 'react-bootstrap';
import Post from './Post.jsx';

class SecondTemplate extends React.Component {
  render() {
    return(
      <div className="container">
        {this.props.post
          ? <div className="container">
              <Jumbotron>
                <h1>{this.props.post.title}</h1>
                <Post title={this.props.post.title}
                text={this.props.post.text}
                path={this.props.post.path}
                _id={this.props.post._id}
                />
              </Jumbotron>
            </div>
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
}, SecondTemplate);
