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
import { Posts } from '../api/posts.js';
import { Pages } from '../api/pages.js';
import { createContainer } from 'meteor/react-meteor-data';
import Tags from './Tags.jsx';

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

    this.state = {
      validPath: true,
      selectedTemplate: 1,
      selectedType: 'Post',
      menuSelected: false,
      menuLocation: 'Menu Location',
      pageDropdown: 'None',
      alertVisible: false,
      errorMessage: '',
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

    this.isValidPath(path);

    if(this.state.selectedType === 'Page'){
      const location = this.state.menuLocation;
      this.locationValidation(location);

      const order = this.refs.order.value;

      this.orderValidation(order);
      let intOrder = parseInt(order);


      path = '/' + path;

      this.props.submitPage(title, path, text, template, location, intOrder, parent);
      this.setState({ errorMessage: '' });
      this.setState({ alertVisible: false });
    } else if(this.state.selectedType === 'Post'){
      this.setState({ errorMessage: '' });
      this.setState({ alertVisible: false });
      this.props.handleSubmit(title, path, text, template)
    }
    // Clear form
    this.refs.order.value = '';
    this.refs.textInput.value = '';
    this.refs.titleInput.value = '';
    this.refs.pathInput.value = '';
  }

  renderPagesDropdown() {
    return this.props.pages.map((page) => {
      return <MenuItem eventKey={page.title} key={page._id}>{page.title}</MenuItem>
    })
  }

  locationValidation(location) {
    //location validation
    if(location === 'Menu Location'){
      this.setState({ errorMessage: 'Please select Menu Location'});
      this.setState({ alertVisible: true });
      throw new Error('Please select Menu Location')
    }
  }

  orderValidation(order) {
    if(order === ''){
      this.setState({ errorMessage: 'Order Field cannot be left blank' });
      this.setState({ alertVisible: true });
      throw new Error('Order Field cannot be left blank')
    }
    //check if value in "order" is a number
    if(isNaN(order)){
      this.setState({ errorMessage: 'Please enter a number in Order field' });
      this.setState({ alertVisible: true });
      throw new Error('Please enter a number in Order field');
    }
  }

  isValidPath(str) {
    let iChars = "~`!#$%^&*+=[]\\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++) {
      if (iChars.indexOf(str.charAt(i)) != -1) {
        this.setState({ errorMessage: 'No special characters in input field'});
        this.setState({ alertVisible: true });
        throw new Error('No special characters in input field');
      }
    }
    this.props.posts.forEach((post) => {
      if(post.path === '/' + str){
        this.setState({ errorMessage: 'path already exists' });
        this.setState({ alertVisible: true });
        throw new Error('path already exists')
      }
    })
    this.props.pages.forEach((page) => {
      if(page.path === '/' + str){
        this.setState({ errorMessage: 'path already exists' });
        this.setState({ alertVisible: true });
        throw new Error('path already exists')
      }
    })
  }

  render() {
    return (
      <Navbar>
        {
          this.state.alertVisible
          ? <Alert bsStyle="danger">
              <h4>Error with form</h4>
              <p>{this.state.errorMessage}</p>
            </Alert>
          : null
        }
        <form className="new-post" onSubmit={this.submitRequest} >
          <br />
          <span>Title of your <span className="type-span">{this.state.selectedType}</span></span><input
            type="text"
            ref="titleInput"
            placeholder="Awesome Page"
            onBlur={this.autoFillPath}
          /><br />
          <span>smartyields.com/</span><input
            type="text"
            ref="pathInput"
            placeholder="desired URL path"
            onChange={this.inputChange}
          /><br />
          <span>Body of your <span className="type-span">{this.state.selectedType}</span></span><input
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
        <Tags />
      </Navbar>
    )
  }
}

export default NewContentForm;
