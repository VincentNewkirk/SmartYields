import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MenuItem from './MenuItem.jsx';

// API
import { Pages } from '/imports/api/pages';

// Class
export default class Menu extends Component {

  renderMenuItems() {

    let orderedPages = [];

    let lowest = 1;

    let that = this;

    let sortingAlg = function(){

      that.props.pages.forEach((page) => {
        if(lowest - 1 === that.props.pages.length){
          return
        }

        if(lowest == page.order){
          orderedPages.push(page);
          lowest += 1;
          sortingAlg();
        }
      })
    }

    sortingAlg();

    return orderedPages.map((menuItem) => (
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
