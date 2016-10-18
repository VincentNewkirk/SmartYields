import React from 'react';
import { Jumbotron }from 'react-bootstrap';
import Post from '/imports/ui/components/post/Post.jsx';

class SecondTemplate extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="container">
          <Jumbotron>
            <h1>{this.props.title}</h1>
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
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default SecondTemplate;
