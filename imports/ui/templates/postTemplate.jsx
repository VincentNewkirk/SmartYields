import React from 'react';
import Post from './Post.jsx';

class PostTemplate extends React.Component{
  render() {
    return(
      <div className="container">
        <header className="intro-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div className="site-heading">
                            <h1>{this.props.title}</h1>
                            <span className="subheading"></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <Post
              title={this.props.title}
              text={this.props.text}
              path={this.props.path}
              type={this.props.type}
              _id={this.props._id}
              type={this.props.type}
              menu={this.props.menu}
              parent={this.props.parent}
              order={this.props.order}
              pages={this.props.pages}
              />
            </div>
        </div>
      </div>
    )
  }
}

export default PostTemplate;
