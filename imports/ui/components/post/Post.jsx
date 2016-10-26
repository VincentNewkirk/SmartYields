import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Down from '/imports/ui/components/down';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.text });
  }
  render() {
    return (
      <div className="post-text">
        <div className="post-container">
          <div className="post-content">
            <Down content={this.state.text} />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
