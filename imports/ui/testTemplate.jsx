import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';

class TestTemplate extends React.Component{
  render() {
    return(
      <div className="container">
        <header className="intro-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div className="site-heading">
                            <h1>Clean Blog</h1>
                            <span className="subheading"></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              {!this.props.post
                ? <p>Loading...</p>
                : <div className="post-container">
                  <h3>{this.props.post.title}</h3>
                  <div className="post-content">
                    {this.props.post.text}
                  </div>
                </div>
              }
            </div>
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
}, TestTemplate);
