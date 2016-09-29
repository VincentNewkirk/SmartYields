import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import Post from './Post.jsx';

class TestTemplate extends React.Component{
  render() {
  console.log(this.props)

    return(
      <div className="container">
        <header className="intro-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div className="site-heading">
                            {this.props.post
                              ? <h1>{this.props.post.title}</h1>
                              : null
                            }
                            <span className="subheading"></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              {this.props.post
                ?<Post title={this.props.post.title} text={this.props.post.text} path={this.props.post.path} _id={this.props.post._id}/>
                : null
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
