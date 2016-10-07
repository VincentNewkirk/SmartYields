import React from 'react';
import { Jumbotron }from 'react-bootstrap';
import Post from './Post.jsx';

class SecondTemplate extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="container">
          <Jumbotron>
            <h1>{this.props.title}</h1>
            <Post title={this.props.title}
            text={this.props.text}
            path={this.props.path}
            type={this.props.type}
            _id={this.props._id}
            />
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default SecondTemplate;
