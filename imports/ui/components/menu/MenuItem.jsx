import React from 'react';

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
