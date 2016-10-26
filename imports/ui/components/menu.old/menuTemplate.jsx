import React from 'react';
import MenuComponent from './menuComponent.jsx';
import { createContainer } from 'meteor/react-meteor-data';


class MenuTemplate extends React.Component {
  render() {
    return(
      <div>
        <MenuComponent />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('pages');

  return {
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, MenuTemplate);
