import React from 'react';
import {
  Button,
  Navbar,
  DropdownButton,
  MenuItem,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { createContainer } from 'meteor/react-meteor-data';

class NewContentForm extends React.Component {
  constructor(){
    super();
    this.onSelectTemplate = this.onSelectTemplate.bind(this);
    this.onSelectType =  this.onSelectType.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.renderPagesDropdown = this.renderPagesDropdown.bind(this);
    this.onPageSelect = this.onPageSelect.bind(this);

    this.state = {
      validPath: true,
      selectedTemplate: 1,
      selectedType: 'Post',
      menuSelected: false,
      menuLocation: 'Menu Location',
      pageDropdown: 'None',
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

  onPageSelect(event) {
    this.setState({ pageDropdown: event })
  }

  submitRequest(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();
    const path = this.refs.pathInput.value.trim();
    const template = this.state.selectedTemplate;
    let parent = null;

    this.props.pages.map((page) => {
      if(page.title === this.state.pageDropdown){
        parent = page._id;
      }
    })

    if(this.state.selectedType === 'Page'){
      const location = this.state.menuLocation;
      //location validation
      if(location === 'Menu Location'){
        alert('Please select Menu Location');
        throw new Error('Please select Menu Location')
      }
      const order = this.refs.order.value;
      //order validation
      if(order === ''){
        alert('Order Field cannot be left blank');
        throw new Error('Order Field cannot be left blank')
      }
      //check if value in "order" is a number
      if(!isNaN(order)){
        //conver value from string to number
        const intOrder = parseInt(order);
        this.props.submitPage(title, path, text, template, location, intOrder, parent);
        this.refs.order = '';
      } else {
        throw new Error('Please enter a number in Order field');
      }
    } else if(this.state.selectedType === 'Post'){
      this.props.handleSubmit(title, path, text, template)
    }
    // Clear form
    this.refs.textInput.value = '';
    this.refs.titleInput.value = '';
    this.refs.pathInput.value = '';
  }

  renderPagesDropdown() {
    return this.props.pages.map((page) => {
      return <MenuItem eventKey={page.title} key={page._id}>{page.title}</MenuItem>
    })
  }

  render() {
    return (
      <Navbar>
        <form className="new-post" onSubmit={this.submitRequest} >
          <br />
          <span>Title of your <span id="title-span">{this.state.selectedType}</span></span><input
            type="text"
            ref="titleInput"
            placeholder="Awesome Page"
          /><br />
          <span>smartyields.com/</span><input
            type="text"
            ref="pathInput"
            placeholder="desired URL path"
            onChange={this.inputChange}
          />{this.props.validPath ?
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
         ?<div>
           <DropdownButton title={this.state.menuLocation} onSelect={this.onSelectMenu} id="17">
              <MenuItem eventKey={'Main'}>Main</MenuItem>
              <MenuItem eventKey={'Sidebar'}>Sidebar</MenuItem>
              <MenuItem eventKey={'Footer'}>Footer</MenuItem>
            </DropdownButton>
            <span>Parent Page:</span>
            <DropdownButton title={this.state.pageDropdown} onSelect={this.onPageSelect} id="7">
              <MenuItem eventKey={'None'}>None</MenuItem>
              {this.renderPagesDropdown()}
            </DropdownButton>
            <input
              type="text"
              placeholder="Order"
              ref="order"
            />
          </div>
          : null
        }
        <Button onClick={this.submitRequest} bsStyle="primary">Save</Button>
      </Navbar>
    )
  }
}

export default NewContentForm;
