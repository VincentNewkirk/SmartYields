import React, { Component } from 'react';
import Down from './Down.jsx';

export default class DownControls extends Component {
  constructor(props) {
    super(props);
    this.makeBold = this.makeBold.bind(this);
  }
  makeBold() {
    console.log(this.props.editorID);
  }
  render() {
    return (
      <ul className="WYSIWYGcontrols">
        <li><button type="button" onClick={this.makeBold}>Bold</button></li>
      </ul>
    );
  }
}
