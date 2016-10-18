import React, { Component } from 'react';
import MarkdownParser from './MarkdownParser.jsx';

export default class MarkdownControls extends Component {
  render() {
    return (
      <ul className="WYSIWYGcontrols">
        <li><button type="button" onClick={MarkdownParser.makeBold("WYSIWYGeditor")}>Bold</button></li>
      </ul>
    );
  }
}
