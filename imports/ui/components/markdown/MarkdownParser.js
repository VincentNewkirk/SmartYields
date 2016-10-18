import React, { Component} from 'react';
import showdown from 'showdown';

// Init
const converter = new showdown.Converter();

export default class MarkdownParser extends Component {
  createMarkup() {
    return {
      __html: converter.makeHtml(this.props.content)
    }
  }
  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
