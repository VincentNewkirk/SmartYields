import React from 'react';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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
    if(this.props.type === 'post'){
      Meteor.call('posts.remove', this.props._id);
    } else if(this.props.type === 'page'){
      Meteor.call('pages.remove', this.props._id);
    }
    FlowRouter.go(FlowRouter.path('/'));
  }

  updateCollection() {
    const text = this.refs.text.value.trim();
    const title = this.refs.title.value.trim();
    const path = this.refs.path.value.trim();
    if(this.props.type === 'post'){
      Meteor.call('posts.update', this.props._id, title, text, path)
    } else if(this.props.type === 'page'){
      Meteor.call('pages.update', this.props._id, title, text, path)
    }
  }

  render() {
    console.log(this.props)
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
         <div className="owner-controls">
          <button className="edit" onClick={this.onClick}>Edit</button>
          <button className="delete" onClick={this.deleteThisPost}>Delete</button>
        </div>

        <a href='/'>Home</a>
      </div>
    );
  }
}

export default Post;

