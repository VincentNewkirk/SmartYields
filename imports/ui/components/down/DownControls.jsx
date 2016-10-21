/**
 * Component: Down Controls
 * Controller you can add to create WYSIWYG effects in your textarea
 * @prop editorID {reference} The DOM reference of the textarea you wish to affect
 */
import React, { Component } from 'react';
import Down from './Down.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class DownControls extends Component {
  constructor(props) {
    super(props);
    this.makeBold = this.makeBold.bind(this);
    this.italicize = this.italicize.bind(this);
    this.strikeThrough = this.strikeThrough.bind(this);
    this.blockQuote = this.blockQuote.bind(this);
    this.codeBlock = this.codeBlock.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
    this.insertImg = this.insertImg.bind(this);
    this.orderedList = this.orderedList.bind(this);
    this.unorderedList = this.unorderedList.bind(this);
    this.state = {
      selectedDropdown: 'Select Image',
    }
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

  codeBlock() {
    let selectedText = this.getSelectionText(this.props.editorID);

    let modifiedText = "```\n"+selectedText+"\n```";

    this.replaceSelectedText(this.props.editorID, modifiedText);
  }

  orderedList() {
    let selectedText = this.getSelectionText(this.props.editorID);

    let modifiedText = "1. " + selectedText;

    this.replaceSelectedText(this.props.editorID, modifiedText);
  }

  unorderedList() {

  }

  insertImg() {
    if(this.state === 'Select Image'){
      return false
    } else {
      let path;

      this.props.images.forEach(img => {
        if(img.title === this.state.selectedDropdown) {
          path = img.path
        }
      });

      let selectedText = this.getSelectionText(this.props.editorID);

      let modifiedText = selectedText + "![alt text](" + path + ")";

      this.replaceSelectedText(this.props.editorID, modifiedText);
    }
  }

  dropdownChange(event) {
    this.setState({ selectedDropdown: event.target.value })
  }

  renderDropdown() {
    let imageList = this.props.images.map((img,index) => (
      <option key={index} value={img.title}>{img.title}</option>
    ));
    return(
      <select onChange={this.dropdownChange}>
        <option value="Select Image">Select Image</option>
        {imageList}
      </select>
    )
  }

  render() {
    return (
      <div className="WYSIWYGcontrols">
        <span><button type="button" onClick={this.makeBold}>Bold</button></span>
        <span><button type="button" onClick={this.italicize}>Italics</button></span>
        <span><button type="button" onClick={this.strikeThrough}>Strike-Through</button></span>
        <span><button type="button" onClick={this.blockQuote}>Block-Quote</button></span>
        <span><button type="button" onClick={this.codeBlock}>Code-Block</button></span>
        <span><button type="button" onClick={this.orderedList}>Ordered List</button></span>
        {this.props.images?
          this.renderDropdown()
          : null
        }
        <span><button type="button" onClick={this.insertImg}>Insert Image</button></span>
      </div>
    );
  }
}
