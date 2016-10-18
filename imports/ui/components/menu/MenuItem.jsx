import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pages } from '/imports/api/pages.js';

export default class MenuItem extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return(
        <li>
          <a href={this.props.path}>{this.props.title}</a>
        </li>
      )
    }
};
