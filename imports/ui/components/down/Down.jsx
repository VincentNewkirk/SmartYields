/**
 * Component: Down
 * A simple component library to turn a textarea into a simple Markdown editor
 * @prop content {string} The string of content we want parsed from markdown into markup
 */
import React, { Component} from 'react';
import showdown from 'showdown';
const converter = new showdown.Converter();

export default class Down extends Component {
  createMarkup() {
    return {
      __html: converter.makeHtml(this.props.content)
    }
  }
  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
