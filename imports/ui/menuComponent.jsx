import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pages } from '../api/pages.js';

class MenuComponent extends React.Component {

  renderTags() {
    if(this.props.location === 'primary'){
      return this.props.primary.map((page, index) => {
        return(
          <ul className='primary' key={index}>{page.title}</ul>
        )
      })
    }
  }

  render() {
  console.log(this.props)
    return(
      <div>
        {
          this.props.location
          ? this.renderTags()
          : null
        }
      </div>
    )
  }
}

export default createContainer(() => {
  const pageList = Pages.find({}, { sort: { createdAt: -1 } }).fetch();
  const primary = [];
  pageList.forEach((ele) => {
    if(ele.menu === "Main"){
      primary.push(ele)
    }
  })
  Meteor.subscribe('pages');

  return {
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    primary,
    currentUser: Meteor.user(),
  };
}, MenuComponent);
