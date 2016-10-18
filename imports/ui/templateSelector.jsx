import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import FirstTemplate from '/imports/ui/templates/firstTemplate.jsx';
import SecondTemplate from '/imports/ui/templates/secondTemplate.jsx';

class TemplateSelector extends React.Component {

  renderPosts() {
    if(this.props.post.template == 1) {
      return <FirstTemplate text={this.props.post.text} path={this.props.post.path} _id={this.props.post._id} title={this.props.post.title} type={this.props.type}/>
    } else if(this.props.post.template == 2) {
      return <SecondTemplate text={this.props.post.text} path={this.props.post.path} title={this.props.post.title} _id={this.props.post._id} type={this.props.type} />
    }
  }

  renderPage() {
    if(this.props.page.template == 1) {
      return <FirstTemplate
      text={this.props.page.text}
      path={this.props.page.path}
      _id={this.props.page._id}
      title={this.props.page.title}
      type={this.props.type}
      menu={this.props.page.menu}
      parent={this.props.page.parent}
      pages={this.props.pages}
      order={this.props.page.order} />
    } else if(this.props.page.template == 2) {
      return <SecondTemplate
      text={this.props.page.text}
      path={this.props.page.path}
      title={this.props.page.title}
      _id={this.props.page._id}
      type={this.props.type}
      menu={this.props.page.menu}
      parent={this.props.page.parent}
      pages={this.props.pages}
      order={this.props.page.order} />
    }
  }

  render(){
    return(
      <div className="container">
        <div className="post-container">
        {this.props.post
          ?
            this.renderPosts()
          : null
        }
        </div>
        <div className="page-container">
        {
          this.props.page
          ?
            this.renderPage()
          : null
        }
        </div>
      </div>
    )
  }
}

export default createContainer((params) => {
  Meteor.subscribe('posts');
  Meteor.subscribe('pages');
  const posts = Posts.find({}).fetch();
  //Filter posts to find one with matching path
  let post;
  posts.forEach((found) => {
    if(found.path === '/posts/' + params.pathLink) {
      post = found;
    }
  })
  const pages = Pages.find({}, { sort: { createdAt: -1 } }).fetch();
  //Filter pages to find one with matching path
  let page;
  pages.forEach((found) => {
    if(found.path === '/' + params.pathLink) {
      page = found;
    }
  })
  return { post, page, pages, currentUser: Meteor.user()};
}, TemplateSelector);
