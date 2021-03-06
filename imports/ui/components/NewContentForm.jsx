import React from 'react';
import {
  Button,
  DropdownButton,
  MenuItem,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
} from 'react-bootstrap';
import Down, { DownControls } from '/imports/ui/components/down';
import DBContents from './DBContents.jsx';
import ImgUploader from './FileUpload.jsx';

class NewContentForm extends React.Component {
  constructor() {
    super();
    this.onSelectTemplate = this.onSelectTemplate.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
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
    this.handlePreview = this.handlePreview.bind(this);
    this.imgUploaded = this.imgUploaded.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertErrorDismiss = this.handleAlertErrorDismiss.bind(this);
    this.contentAlertDismiss = this.contentAlertDismiss.bind(this);
    this.handleAlertVisibleDismiss = this.handleAlertVisibleDismiss.bind(this);
    this.titleInputChange = this.titleInputChange.bind(this);
    this.orderChange = this.orderChange.bind(this);
    this.deleteContent = this.deleteContent.bind(this);

    this.state = {
      // General
      isPageType: false,
      selectedTemplate: 'template_post', // Default and DB entry value for page type
      selectedType: 'Post',
      menuLocation: 'Menu Location',
      pageDropdown: 'None',
      contentPreview: '',
      title: '',
      path: '',
      order: '',
      id: '',
      // Validation
      validPath: true,
      alertVisible: false,
      alertSuccess: false,
      alertError: false,
      successfulPost: false,
      errorMessage: '',
      // Visibility State for DB Contents container
      showContents: false,
    };
  }

  componentDidMount() {
    if (this.props.singleType === 'page') {
      let foundPage;
      this.props.pages.forEach((page) => {
        if (page.path === '/' + this.props.singlePage) {
          foundPage = page;
        }
      });
      this.setState({
        title: foundPage.title,
        path: this.props.singlePage,
        order: foundPage.order,
        id: foundPage._id,
        contentPreview: foundPage.text,
        isPageType: true,
        selectedTemplate: 'template_a',
        selectedType: 'Page',
        menuLocation: foundPage.menu,
      });
    } else if (this.props.singleType === 'post') {
      let foundPost;
      this.props.posts.forEach((post) => {
        if (post.path === '/posts/' + this.props.singlePage) {
          foundPost = post;
        }
      });
      this.setState({
        title: foundPost.title,
        path: this.props.singlePage,
        contentPreview: foundPost.text,
        id: foundPost._id,
        isPageType: false,
        selectedTemplate: 'template_post',
        selectedType: 'Post',
      });
    } else {
      this.setState({
        isPageType: false,
        selectedTemplate: 'template_post',
        selectedType: 'Post',
        menuLocation: 'Menu Location',
        pageDropdown: 'None',
        contentPreview: '',
        title: '',
        path: '',
        order: '',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.singleType === 'page') {
      let foundPage;
      this.props.pages.forEach((page) => {
        if (page.path === '/' + nextProps.singlePage) {
          foundPage = page;
        }
      });
      this.setState({
        title: foundPage.title,
        path: nextProps.singlePage,
        order: foundPage.order,
        id: foundPage._id,
        contentPreview: foundPage.text,
        isPageType: true,
        selectedTemplate: 'template_a',
        selectedType: 'Page',
        menuLocation: foundPage.menu,
      });
    } else if (nextProps.singleType === 'post') {
      let foundPost;
      this.props.posts.forEach((post) => {
        if (post.path === '/posts/' + nextProps.singlePage) {
          foundPost = post;
        }
      });
      this.setState({
        title: foundPost.title,
        path: nextProps.singlePage,
        contentPreview: foundPost.text,
        id: foundPost._id,
        isPageType: false,
        selectedTemplate: 'template_post',
        selectedType: 'Post',
      });
    } else {
      this.setState({
        isPageType: false,
        selectedTemplate: 'template_post',
        selectedType: 'Post',
        menuLocation: 'Menu Location',
        pageDropdown: 'None',
        contentPreview: '',
        title: '',
        path: '',
        order: '',
      });
    }
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }

  imgUploaded(result) {
    if (result) {
      this.setState({ alertSuccess: true });
    } else {
      this.setState({ alertError: true });
    }
  }

  handleAlertDismiss() {
    this.setState({ alertSuccess: false });
  }

  handleAlertErrorDismiss() {
    this.setState({ alertError: false });
  }

  contentAlertDismiss() {
    this.setState({ successfulPost: false });
  }

  handleAlertVisibleDismiss() {
    this.setState({ alertVisible: false });
  }

  inputChange(event) {
    this.setState({
      validPath: true,
      path: event.target.value,
    });
  }

  titleInputChange(event) {
    this.setState({ title: event.target.value });
  }

  orderChange(event) {
    this.setState({ order: event.target.value });
  }

  onSelectTemplate(event) {
    this.setState({ selectedTemplate: event.target.value });
  }

  onSelectType(event) {
    this.setState({ selectedType: event.target.value });
    if (event.target.value === 'Page') {
      this.setState({
        isPageType: true,
        selectedTemplate: 'template_a',
      });
    } else {
      this.setState({
        isPageType: false,
        selectedTemplate: 'template_post',
      });
    }
  }

  onSelectMenu(event) {
    this.setState({ menuLocation: event });
  }

  onPageSelect(event) {
    this.setState({ pageDropdown: event });
  }

  autoFillPath() {
    const tempArray = this.state.title.split('');
    const replaceWhiteSpace = tempArray.map((element) => {
      if (element === ' ') {
        return '-';
      } else {
        return element;
      }
    });
    const parsedString = replaceWhiteSpace.join('').toLowerCase();
    this.setState({ path: parsedString });
    this.WYSIWYGeditor.focus();
  }

  submitRequest(event) {

    event.preventDefault();

    // Find the text field via the React ref
    const text = this.WYSIWYGeditor.value.trim();
    const title = this.state.title;
    const template = this.state.selectedTemplate;
    let path = this.state.path;
    let parent = null;

    this.props.pages.map((page) => {
      if (page.title === this.state.pageDropdown) {
        parent = page._id;
      }
    });

    if (this.state.selectedType === 'Page') {
      const location = this.state.menuLocation;
      const order = this.state.order;
      if (this.locationValidation(location) && this.orderValidation(order) && this.initialInputValidation() && this.isValidPath(path, false)) {
        const intOrder = parseInt(order);
        path = '/' + path;
        if (this.props.singleType) {
          this.props.updatePage(this.state.id, title, text, path, location, parent, intOrder)
          FlowRouter.reload();
        } else {
          this.props.submitPage(title, path, text, template, location, intOrder, parent);
          FlowRouter.redirect(path);
        }
        if (this.state.alertVisible) {
          this.setState({ errorMessage: '' });
          this.setState({ alertVisible: false });
        }
        this.setState({ successfulPost: true });
      } else {
        this.setState({ alertVisible: true })
      }
    } else if(this.state.selectedType === 'Post'){
      if (this.initialInputValidation() && this.isValidPath(path, true)) {
          this.setState({ errorMessage: '' });
          this.setState({ alertVisible: false });
          path = '/posts/' + path;
          if (this.props.singlePage) {
            this.props.updatePost(this.state.id, title, text, path)
            FlowRouter.reload();
          } else {
            this.props.handleSubmit(title, path, text, template);
            FlowRouter.redirect(path);
          }
          this.setState({ successfulPost: true });
        } else {
          this.setState({ alertVisible: true });
        }
    }
  }

  deleteContent() {
    if (this.props.singleType === 'page') {
      this.props.deletePage(this.state.id);
    } else if (this.props.singleType === 'post') {
      this.props.deletePost(this.state.id);
    }
    FlowRouter.go(FlowRouter.path('/'));
  }

  renderPagesDropdown() {
    return this.props.pages.map(page => {
      return <MenuItem eventKey={page.title} key={page._id}>{page.title}</MenuItem>
    });
  }

  initialInputValidation() {
    const text = this.WYSIWYGeditor.value;
    const title = this.refs.titleInput.value;
    const path = this.refs.pathInput.value;
    if ( text === '' || title === '' || path === '') {
      this.setState({ errorMessage: 'Please fill out all input fields' });
      return false;
    } else {
      return true;
    }
  }

  locationValidation(location) {
    if (location === 'Menu Location') {
      this.setState({ errorMessage: 'Please select Menu Location'});
      return false;
    } else {
      return true;
    }
  }

  orderValidation(order) {
    if (order === '') {
      this.setState({ errorMessage: 'Order Field cannot be left blank' });
      return false;
    }
    //check if value in "order" is a number
    if (isNaN(order)) {
      this.setState({ errorMessage: 'Please enter a number in Order field' });
      return false;
    }
    return true;
  }

  isValidPath(str, isPost) {
    const iChars = "~`!#$%^&*+=[]\\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++) {
      if (iChars.indexOf(str.charAt(i)) !== -1) {
        this.setState({ errorMessage: 'No special characters in input field' });
        return false;
      }
    }

    let occupiedPath = true;

    if (!this.props.singlePage) {
      if (isPost) {
        const postPath = this.props.posts.forEach((post) => {
          if (post.path === '/posts/' + str) {
            this.setState({ errorMessage: 'path already exists' });
            occupiedPath = false;
          }
        });
      } else {
        const pagePath = this.props.pages.forEach((page) => {
          if (page.path === '/' + str) {
            this.setState({ errorMessage: 'path already exists' });
            occupiedPath = false;
          }
        });
      }
    }
    if (!occupiedPath) {
      return false;
    }
    return true;
  }

  toggleContents() {
    this.setState({ showContents: !this.state.showContents });
  }

  handlePreview(event) {
    this.setState({
      contentPreview: event.target.value,
    });
  }

  render() {
    return (
      <div className="well">

        {/* Validation Messages */}
        {
          this.state.alertVisible
          ? <Alert bsStyle="danger">
            <h4>Error with form</h4>
            <p>{this.state.errorMessage}</p>
            <Button onClick={this.handleAlertVisibleDismiss}>Dismiss</Button>
          </Alert>
          : null
        }
        { this.state.alertSuccess ?
          <Alert bsStyle="success">
            <h4>Image Successfully Uploaded!</h4>
            <Button onClick={this.handleAlertDismiss}>Dismiss</Button>
          </Alert>
          : null
        }
        { this.state.alertError ?
          <Alert bsStyle="danger">
            <h4>Error During Upload</h4>
            <Button onClick={this.handleAlertErrorDismiss}>Dismiss</Button>
          </Alert>
          : null
        }
        { this.state.successfulPost ?
          <Alert bsStyle="success">
            <h4>{this.state.selectedType} Successfully Created!</h4>
            <Button onClick={this.contentAlertDismiss}>Dismiss</Button>
          </Alert>
          : null
        }
        {/* Admin Form */}
        <form className="new-post" onSubmit={this.submitRequest} >
          <span>Title of your <span className="type-span">{this.state.selectedType}</span></span><input
            type="text"
            ref="titleInput"
            placeholder="Awesome Page"
            value={this.state.title}
            onChange={this.titleInputChange}
            onBlur={this.autoFillPath}
          /><br />
          <span>smartyields.com/{this.state.selectedType === 'Post' ? 'posts/' : null}</span><input
            type="text"
            ref="pathInput"
            placeholder="desired URL path"
            value={this.state.path}
            onChange={this.inputChange}
          /><br />
          <p>Body of your <span className="type-span">{this.state.selectedType}:</span></p>

          {/* Main Content Editor */}
          <div className="WYSIWYGcontainer">
            {/* <DownControls editorID="WYSIWYGeditor" /> */}
            <DownControls editorID={this.WYSIWYGeditor} images={this.props.images} />
            <textarea
              id="WYSIWYGeditor"
              // ref="WYSIWYGeditor"
              ref={(ref) => this.WYSIWYGeditor = ref}
              placeholder="Hello, world!"
              rows={4}
              cols="50"
              value={this.state.contentPreview}
              onChange={this.handlePreview}
            />
            <div id="WYSIWYGpreview">
              <Down content={this.state.contentPreview}/>
            </div>
          </div>

          <FormGroup controlId="templateSelect">
            <ControlLabel>Template Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onSelectTemplate}>
              {this.state.isPageType ? <option value="template_a">Template A</option> : null }
              {this.state.isPageType ? <option value="template_b">Template B</option> : null }
              {!this.state.isPageType ? <option value="template_post">Post Template</option> : null }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="contentTypeSelect">
            <ControlLabel>Content Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onSelectType}>
              <option value="Post">Post</option>
              <option value="Page">Page</option>
            </FormControl>
          </FormGroup>

          {this.state.isPageType
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
                value={this.state.order}
                onChange={this.orderChange}
                placeholder="Order"
                ref="order"
                />
           </div>
            : null
          }
          {
            this.props.singlePage
            ?
            <Button type="submit" bsStyle="primary">Update</Button>
            :
            <Button type="submit" bsStyle="primary">Save</Button>
          }
        </form>

        <ImgUploader images={this.props.images} imgHandler={this.props.imgHandler} imgUploaded={this.imgUploaded} />
        {/* DB Contents */}
        <Button onClick={this.toggleContents} bsStyle="info">Show DB Contents</Button>
        {
          this.props.singlePage
          ?
          <Button bsStyle="danger" onClick={this.deleteContent}>Delete</Button>
          : null
        }
        {
          this.state.showContents
          ?<DBContents pages={this.props.pages} posts={this.props.posts} toggle={this.toggleContents} />
          : null
        }
      </div>

    );
  }
}

export default NewContentForm;
