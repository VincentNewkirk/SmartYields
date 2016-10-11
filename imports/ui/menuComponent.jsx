import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pages } from '../api/pages.js';

class MenuComponent extends React.Component {
  render() {
  console.log(this.props)
    return(
      <div>
      </div>
    )
  }
}

export default createContainer(() => {
  const pageList = Pages.find({}, { sort: { createdAt: -1 } }).fetch();
  const primary = pageList.map((page) => {
    return page.menu.main
  })
  Meteor.subscribe('pages');

  return {
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    primary,
    currentUser: Meteor.user(),
  };
}, MenuComponent);
