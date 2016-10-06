import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pagination } from 'react-bootstrap';
import { Posts } from '../api/posts.js';

class PostTags extends React.Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activePage : 1,
    }
  }

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey })
  }

  renderTags() {
    return this.props.posts.map(posts => (
      <div className="a-tags" key={posts._id}>
        <a href={posts.path}>{posts.title}</a><br />
      </div>
    ));
  }

  render() {
    return(
      <div className="all-posts">
        {this.props.posts
          ? this.renderTags()
          : null
        }
        <Pagination
          bsSize="medium"
          items={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
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
}, PostTags);