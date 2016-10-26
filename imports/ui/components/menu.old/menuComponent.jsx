import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pages } from '/imports/api/pages.js';

class MenuComponent extends React.Component {

  renderTags() {
    if(this.props.location === 'primary'){
      return this.props.primary.map((page, index) => {
        return(
          <ul className='primary' key={index}><a href={'/page' + page.path}>{page.title}</a></ul>
        )
      })
    } else if(this.props.location === 'sidebar'){
      return this.props.sidebar.map((page, index) => {
        return(
          <ul className='sidebar' key={index}><a href={'/page' + page.path}>{page.title}</a></ul>
        )
      })
    } else if(this.props.location === 'footer'){
      return this.props.footer.map((page, index) => {
        return(
          <ul className='footer' key={index}><a href={'/page' + page.path}>{page.title}</a></ul>
        )
      })
    }
  }

  render() {
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
  const sidebar = [];
  const footer = [];
  pageList.forEach((ele) => {
    if(ele.menu === "Main"){
      primary.push(ele)
    }
  })
  pageList.forEach((ele) => {
    if(ele.menu === "Sidebar"){
      sidebar.push(ele)
    }
  })
  pageList.forEach((ele) => {
    if(ele.menu === "Footer"){
      footer.push(ele)
    }
  })
  Meteor.subscribe('pages');

  return {
    pages: Pages.find({}, { sort: { createdAt: -1 } }).fetch(),
    primary,
    sidebar,
    footer,
    currentUser: Meteor.user(),
  };
}, MenuComponent);
