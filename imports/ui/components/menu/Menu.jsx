import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MenuItem from './MenuItem.jsx';

// API
import { Pages } from '/imports/api/pages';

// Class
export default class Menu extends Component {

  renderMenuItems() {

    let arrToPush = [];
    let pageCopy = this.props.pages.map((page) => {
      return page;
    })
    let testLowest = pageCopy[0];

    let ultimateAlg = () => {
      if (arrToPush.length === this.props.pages.length || !pageCopy.length) {
        return
      }

      let index = 0;

      for (let i = 0; i < pageCopy.length;  i++) {
        if (pageCopy[i].order < testLowest.order) {
          testLowest = pageCopy[i];
          index = i;
        }
      }
      arrToPush.push(testLowest);
      pageCopy.splice(index, 1);
      testLowest = pageCopy[0];
      ultimateAlg();
    }

    ultimateAlg();

    return arrToPush.map((menuItem) => (
      <MenuItem key={menuItem._id} title={menuItem.title} path={menuItem.path} />
    ));
  }

  render() {
    return (
      <ul className="nav navbar-nav">
        {this.renderMenuItems()}
        {/* HACK: Need to think through how we can have non-page elements as menu items */}
        <li><a href="/posts">Posts</a></li>
      </ul>
    );
  }

}

export default createContainer(({ location }) => {
    Meteor.subscribe('pages');
    return {
        pages: Pages.find({ menu: location }).fetch()
    }
}, Menu);
