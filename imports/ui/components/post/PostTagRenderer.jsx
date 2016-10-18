import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pagination } from 'react-bootstrap';
import { Posts } from '/imports/api/posts.js';
import PostTags from './PostTags.jsx';

class PostTagRenderer extends React.Component {
  render() {
    return(
      <div>
        {
          this.props.posts
          ? <PostTags posts={this.props.posts} sortedPosts={this.props.sortedPosts} pLength={this.props.sortedPosts.length}/>
          : 'No posts yet! You should make one :)'
        }
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');
  const initalPosts = Posts.find({}, { sort: { createdAt: -1 } }).fetch();
  let array = [];
  let arrToPush = [];
  let counter = 0;
    for(let i = 0; i < initalPosts.length; i++){
      //Change the number in 'if' statement to determine how many
      //links get rendered per page
      if(counter === 5){
        array.push(arrToPush)
        arrToPush = [];
        counter = 0;
        }
      arrToPush.push(initalPosts[i]);
      counter += 1;
    }
  if(arrToPush.length){
    array.push(arrToPush)
  }

  return {
    sortedPosts: array,
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, PostTagRenderer);
