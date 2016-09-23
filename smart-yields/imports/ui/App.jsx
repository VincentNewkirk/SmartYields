import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


import Post from './Post.jsx';

class App extends React.Component{
  renderPosts(){
    let that = this;
    return this.props.posts.map((posts) => (
      <Post
      key={posts._id}
      post={posts}
      canEdit={that.props.currentUser ? true: false }
      />
    ))
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Posts.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render(){
    return (
      <div className='post-container'>

        <AccountsUIWrapper />

        { this.props.currentUser ?
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new posts"
            />
          </form> : ''
        }
        {this.renderPosts()}
        {this.props.yield}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);