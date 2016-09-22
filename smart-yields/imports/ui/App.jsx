import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import ReactDOM from 'react-dom';

import Post from './Post.jsx';

class App extends React.Component{
  renderPosts(){
    return this.props.posts.map((posts) => (
      <Post key={posts._id} post={posts}/>
    ))
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Posts.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render(){
    return (
      <div className='post-container'>
        <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
        </form>
        {this.renderPosts()}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);