/* eslint-env meteor */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { Meteor } from 'meteor/meteor';
import { Button, Navbar, PageHeader, DropdownButton, MenuItem } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import Post from './Post.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
    this.onSelectTemplate = this.onSelectTemplate.bind(this);
    this.onSelectType =  this.onSelectType.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
    this.state = {
      validPath: true,
      selectedTemplate: 1,
      selectedType: 'Select Type',
      menuSelected: false,
      menuLocation: 'Menu Location',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();
    const path = '/' + this.refs.pathInput.value.trim();
    const template = this.state.selectedTemplate;

    //validate URL input doesn't contain special characters
    //or is already a path in use
    if(this.isValidInput(this.refs.pathInput.value.trim())){
      this.props.posts.forEach((post) => {
        if(post.path === path){
          this.setState({ validPath: false });
          throw new Error('path already exists')
        }
      });
    }

    if(this.state.validPath){
      Meteor.call('posts.insert', text, title, path, template);
    }

    // Clear form
    this.refs.textInput.value = '';
    this.refs.titleInput.value = '';
    this.refs.pathInput.value = '';
  }

  isValidInput(str) {
    let iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++) {
       if (iChars.indexOf(str.charAt(i)) != -1) {
           this.setState({ validPath: false });
           throw new Error('No special characters in input field')
       }
    return true;
    }
  }

  inputChange() {
    this.setState({ validPath: true })
  }

  onSelectTemplate(event) {
    this.setState({ selectedTemplate: event })
  }

  onSelectType(event) {
    this.setState({ selectedType: event });
    if(event === 'Page'){
      this.setState({ menuSelected: true });
    } else {
      this.setState({ menuSelected: false });
    }
  }

  onSelectMenu(event){
    this.setState({ menuLocation: event })
  }

  render() {
    return (
      <div className="post-container container">

        <AccountsUIWrapper />
        <PageHeader>Smart Yields Custom CMS</PageHeader>
        { this.props.currentUser ?
          <Navbar>
            <form className="new-post" onSubmit={this.handleSubmit} >
              <br />
              <span>Title of your page</span><input
                type="text"
                ref="titleInput"
                placeholder="Awesome Page"
              /><br />
              <span>smartyields.com/</span><input
                type="text"
                ref="pathInput"
                placeholder="desired URL path"
                onChange={this.inputChange}
              />{this.state.validPath ?
                  null
                  : <span>Invalid URL. Specified URL may already be in use</span>
                }<br />
              <span>Body of your page</span><input
                type="text"
                ref="textInput"
                placeholder="'Hello! This is my page!'"
              /><br />
              <DropdownButton title={'Template ' + this.state.selectedTemplate} onSelect={this.onSelectTemplate} id="1337">
                <MenuItem eventKey={1} ref="template1">Template 1</MenuItem>
                <MenuItem eventKey={2} ref="template2">Template 2</MenuItem>
              </DropdownButton>
            </form>
            <DropdownButton title={this.state.selectedType} onSelect={this.onSelectType} id="137">
              <MenuItem eventKey={'Post'} ref="template1">Post</MenuItem>
              <MenuItem eventKey={'Page'} ref="template2">Page</MenuItem>
            </DropdownButton>
            {this.state.menuSelected
             ?<DropdownButton title={this.state.menuLocation} onSelect={this.onSelectMenu} id="17">
                <MenuItem eventKey={'Main'}>Main</MenuItem>
                <MenuItem eventKey={'Sidebar'}>Sidebar</MenuItem>
                <MenuItem eventKey={'Footer'}>Footer</MenuItem>
              </DropdownButton>
              : null
            }
            <Button onClick={this.handleSubmit} bsStyle="primary">Save</Button>
          </Navbar>
          : null
        }
        {this.props.yield}
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
