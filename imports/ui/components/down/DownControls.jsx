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
    this.italicize = this.italicize.bind(this);
    this.strikeThrough = this.strikeThrough.bind(this);
    this.blockQuote = this.blockQuote.bind(this);
  }

  getSelectionText(editorID) {
    var text = "";
    if (window.getSelection) {
        try {
            var ta = editorID;
            text = ta.value.substring(ta.selectionStart, ta.selectionEnd);
        } catch (e) {
            console.log('Cant get selection text')
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
  }

  replaceSelectedText(editorID, replacementText) {
    let val = editorID.value;
    // Grab contents around selected text and replace with new text
    editorID.value = val.slice(0, editorID.selectionStart) + replacementText + val.slice(editorID.selectionEnd);
  }

  makeBold() {
    // Retrieve selected text
    let selectedText = this.getSelectionText(this.props.editorID);
    // Modify text to output as markdown
    let modifiedText = "**"+selectedText+"**";
    // Replace the text
    this.replaceSelectedText(this.props.editorID, modifiedText);
    // console.log(this.props.editorID);
  }

  italicize() {
    let selectedText = this.getSelectionText(this.props.editorID);

    let modifiedText = "*"+selectedText+"*";

    this.replaceSelectedText(this.props.editorID, modifiedText);

  }

  strikeThrough() {
    let selectedText = this.getSelectionText(this.props.editorID);

    let modifiedText = "<s>"+selectedText+"</s>";

    this.replaceSelectedText(this.props.editorID, modifiedText);
  }

  blockQuote() {
    let selectedText = this.getSelectionText(this.props.editorID);

    let modifiedText = ">"+selectedText;

    this.replaceSelectedText(this.props.editorID, modifiedText);
  }

  render() {
    return (
      <ul className="WYSIWYGcontrols">
        <li><button type="button" onClick={this.makeBold}>Bold</button></li>
        <li><button type="button" onClick={this.italicize}>Italics</button></li>
        <li><button type="button" onClick={this.strikeThrough}>Strike-Through</button></li>
        <li><button type="button" onClick={this.blockQuote}>Block-Quote</button></li>
      </ul>
    );
  }
}
