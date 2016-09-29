import React from 'react';
import { Posts } from '../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      showEditForm: false
    };
    this.onClick = this.onClick.bind(this);
    this.deleteThisPost = this.deleteThisPost.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
  }

  onClick () {
    this.setState({showEditForm: !this.state.showEditForm});
  }

  deleteThisPost() {
    Posts.remove(this.props._id);
  }

  updateCollection() {
    Posts.update({_id: this.props._id}, {$set:
      {
        title: this.refs.title.value,
        text: this.refs.text.value,
        path: this.refs.path.value
      }})
  }

  render() {
    return (
      <div className="post-text">
        {!this.props.title
          ? <p>Loading...</p>
          : <div className="post-container">
            <div className="post-content">
              {this.props.text}
            </div>
          </div>
        }
        {this.state.showEditForm
          ? <div className="edit-inputs">
              <input type="text" ref="title" defaultValue={this.props.title} /> <br />
              <input type="text" ref="text" defaultValue={this.props.text}/> <br />
              <input type="text" ref="path" defaultValue={this.props.path} />
              <button className="save-button" onClick={this.updateCollection}>Save</button>
            </div>
          : null
        }
        {this.props.currentUser
          ? <div className="owner-controls">
            <button className="edit" onClick={this.onClick}>Edit</button>
            <button className="delete" onClick={this.deleteThisPost}>Delete</button>
          </div>
          : null
        }
        <a href='/'>Home</a>
      </div>
    );
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
}, Post);

