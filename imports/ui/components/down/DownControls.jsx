/**
 * Component: Down Controls
 * Controller you can add to create WYSIWYG effects in your textarea
 * @prop editorID {reference} The DOM reference of the textarea you wish to affect
 */
import React, { Component } from 'react';
import Down from './Down.jsx';

export default class DownControls extends Component {
  constructor(props) {
    super(props);
    this.makeBold = this.makeBold.bind(this);
  }

  // http://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div
  replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
  }

  // Hybrid approach
  //http://stackoverflow.com/questions/10596606/window-getselection-get-the-right-selection-in-textarea/10596963#10596963
  // http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
  getSelectionText() {
    var text = "";
    if (window.getSelection) {
        try {
            var ta = this.props.editorID;
            text = ta.value.substring(ta.selectionStart, ta.selectionEnd);
        } catch (e) {
            console.log('Cant get selection text')
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
  }

  makeBold() {
    // Retrieve selected text
    let selectedText = this.getSelectionText();
    // Modify text to output as markdown
    let modifiedText = "**"+selectedText+"**";
    console.log(modifiedText);
    // Replace the text
    this.replaceSelectedText(modifiedText);
    // console.log(this.props.editorID);
  }
  render() {
    return (
      <ul className="WYSIWYGcontrols">
        <li><button type="button" onClick={this.makeBold}>Bold</button></li>
      </ul>
    );
  }
}
