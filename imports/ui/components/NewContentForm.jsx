import React from 'react';
import {
  Button,
  Navbar,
  DropdownButton,
  MenuItem,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap';
import { Posts } from '../../api/posts.js';
import { Pages } from '../../api/pages.js';
import { createContainer } from 'meteor/react-meteor-data';
import DBContents from './DBContents.jsx';

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
    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.isValidPath = this.isValidPath.bind(this);
    this.locationValidation = this.locationValidation.bind(this);
    this.orderValidation = this.orderValidation.bind(this);
    this.autoFillPath = this.autoFillPath.bind(this);
    this.toggleContents = this.toggleContents.bind(this);
    this.initialInputValidation = this.initialInputValidation.bind(this);

    this.state = {
      validPath: true,
      selectedTemplate: 1,
      selectedType: 'Post',
      menuSelected: false,
      menuLocation: 'Menu Location',
      pageDropdown: 'None',
      alertVisible: false,
      errorMessage: '',
      showContents: false,
    }
  }

  handleAlertShow() {
    this.setState({ alertVisible: true})
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

  autoFillPath() {
    let tempArray = this.refs.titleInput.value.split('');
    let replaceWhiteSpace = tempArray.map((element) => {
      if(element === ' '){
        return '-'
      } else {
        return element
      }
    })
    const parsedString = replaceWhiteSpace.join('').toLowerCase();
    this.refs.pathInput.value = parsedString;
    this.refs.textInput.focus()
  }

  submitRequest(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = this.refs.textInput.value.trim();
    const title = this.refs.titleInput.value.trim();
    const template = this.state.selectedTemplate;
    let path = this.refs.pathInput.value.trim();
    let parent = null;

    this.props.pages.map((page) => {
      if(page.title === this.state.pageDropdown){
        parent = page._id;
      }
    })




    if(this.state.selectedType === 'Page'){
      const location = this.state.menuLocation;
      const order = this.refs.order.value;
      if(this.locationValidation(location) && this.orderValidation(order) && this.initialInputValidation() && this.isValidPath(path)){
        let intOrder = parseInt(order);
        path = '/' + path;
        this.props.submitPage(title, path, text, template, location, intOrder, parent);
        // Clear form
        this.refs.order.value = '';
        this.refs.textInput.value = '';
        this.refs.titleInput.value = '';
        this.refs.pathInput.value = '';
        if(this.state.alertVisible){
          this.setState({ errorMessage: '' });
          this.setState({ alertVisible: false });
        }
      } else {
        this.setState({ alertVisible: true })
      }
    } else if(this.state.selectedType === 'Post'){
        if(this.initialInputValidation() && this.isValidPath(path)){
          this.setState({ errorMessage: '' });
          this.setState({ alertVisible: false });
          path = '/posts/' + path;
          this.props.handleSubmit(title, path, text, template)
          // Clear form
          this.refs.textInput.value = '';
          this.refs.titleInput.value = '';
          this.refs.pathInput.value = '';
        } else {
          this.setState({ alertVisible: true })
        }
    }
  }

  renderPagesDropdown() {
    return this.props.pages.map((page) => {
      return <MenuItem eventKey={page.title} key={page._id}>{page.title}</MenuItem>
    })
  }

  initialInputValidation() {
    const text = this.refs.textInput.value;
    const title = this.refs.titleInput.value;
    const path = this.refs.pathInput.value;
    if( text === '' || title === '' || path === ''){
      this.setState({ errorMessage: 'Please fill out all input fields' })
      return false;
    } else {
      return true;
    }
  }

  locationValidation(location) {
    if(location === 'Menu Location'){
      this.setState({ errorMessage: 'Please select Menu Location'});
      return false;
    } else {
      return true;
    }
  }

  orderValidation(order) {
    if(order === ''){
      this.setState({ errorMessage: 'Order Field cannot be left blank' });
      return false;
    }
    //check if value in "order" is a number
    if(isNaN(order)){
      this.setState({ errorMessage: 'Please enter a number in Order field' });
      return false;
    }
    return true;
  }

  isValidPath(str) {
    let iChars = "~`!#$%^&*+=[]\\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++) {
      if (iChars.indexOf(str.charAt(i)) != -1) {
        this.setState({ errorMessage: 'No special characters in input field'});
        return false
      }
    }

    this.props.posts.forEach((post) => {
      if(post.path === '/posts/' + str){
        this.setState({ errorMessage: 'path already exists' });
        return false;
      }
    })
    this.props.pages.forEach((page) => {
      if(page.path === '/' + str){
        this.setState({ errorMessage: 'path already exists' });
        return false;
      }
    })
    return true;
  }

  toggleContents() {
    this.setState({ showContents: !this.state.showContents });
  }

  render() {
    return (
      <div className="well">
        {
          this.state.alertVisible
          ? <Alert bsStyle="danger">
              <h4>Error with form</h4>
              <p>{this.state.errorMessage}</p>
            </Alert>
          : null
        }

        {/* Admin Form */}
        <form className="new-post" onSubmit={this.submitRequest} >
          <span>Title of your <span className="type-span">{this.state.selectedType}</span></span><input
            type="text"
            ref="titleInput"
            placeholder="Awesome Page"
            onBlur={this.autoFillPath}
          /><br />
          <span>smartyields.com/{this.state.selectedType === 'Post' ? 'posts/' : null}</span><input
            type="text"
            ref="pathInput"
            placeholder="desired URL path"
            onChange={this.inputChange}
          /><br />
          <p>Body of your <span className="type-span">{this.state.selectedType}:</span></p>
          <textarea ref="textInput" placeholder="'Hello! This is my page!'" rows={4} cols="50" />
          <br />
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
              <MenuItem eventKey={'None'}>None</MenuItem>
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
        <br />

        {/* DB Contents */}
        <Button onClick={this.toggleContents} bsStyle="info">Show DB Contents</Button>
        {
          this.state.showContents
          ?<DBContents pages={this.props.pages} posts={this.props.posts} toggle={this.toggleContents}/>
          : null
        }
      </div>
    )
  }
}

export default NewContentForm;
