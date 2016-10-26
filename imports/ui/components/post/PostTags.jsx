import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pagination } from 'react-bootstrap';
import { Posts } from '/imports/api/posts.js';

class PostTags extends React.Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activePage : 1,
    }
  }

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey })
  }

  renderTags() {
    if(this.props.sortedPosts.length){
    return this.props.sortedPosts[this.state.activePage - 1].map(posts =>(
      <div className="a-tags" key={posts._id}>
        <a href={posts.path}>{posts.title}</a><br />
      </div>
    ));
    }
  }


  render() {
    return(
      <div className="all-posts">
        {this.renderTags()}
        <div>
          <Pagination
            bsSize="medium"
            items={this.props.pLength}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        </div>
      </div>
    )
  }
}

export default PostTags;
