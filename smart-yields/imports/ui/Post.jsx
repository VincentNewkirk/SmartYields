import React from 'react';
import { Posts } from '../api/posts.js';
import { createContainer } from 'meteor/react-meteor-data';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      showEditForm: false
    };
  }

  onClick () {
    this.setState({showEditForm: !this.state.showEditForm});
  }

  deleteThisPost() {
    Posts.remove(this.props.post._id);
  }

  updateCollection() {
    Posts.update({_id: this.props.post._id}, {$set:
      {
        title: this.refs.title.value,
        text: this.refs.text.value,
        path: this.refs.path.value
      }})
  }

  render() {
    return (
      <div className="post-text">
        {this.props.post === undefined ? <p>Loading...</p> :
          <div className="post-container">
            <h3>{this.props.post.title}</h3>
            <div className="post-content">
              {this.props.post.text}
            </div>
          </div>
        }
        {this.state.showEditForm
          ? <div className="edit-inputs">
              <input type="text" ref="title" defaultValue={this.props.post.title} /> <br />
              <input type="text" ref="text" defaultValue={this.props.post.text}/> <br />
              <input type="text" ref="path" defaultValue={this.props.post.path} />
              <button className="save-button" onClick={this.updateCollection.bind(this)}>Save</button>
            </div>
          : null
        }
        {this.props.currentUser ?
          <div className="owner-controls">
            <button className="edit" onClick={this.onClick.bind(this)}>Edit</button>
            <button className="delete" onClick={this.deleteThisPost.bind(this)}>Delete</button>
          </div> : null
        }
        <a href='/'>Home</a>
      </div>
    );
  }
}

export default createContainer((params) => {
  const { id } = params;
  const subscription = Meteor.subscribe('posts', id);
  const loading = !subscription.ready();
  const post = Posts.findOne(id);
  return {loading, post, currentUser: Meteor.user()};
}, Post);

