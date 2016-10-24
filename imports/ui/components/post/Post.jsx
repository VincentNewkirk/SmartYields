import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Down from '/imports/ui/components/down';

class Post extends React.Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.deleteThisPost = this.deleteThisPost.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
    this.onPageSelect = this.onPageSelect.bind(this);
    this.renderPagesDropdown = this.renderPagesDropdown.bind(this);
    this.orderChange = this.orderChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.pathChange = this.pathChange.bind(this);
    this.state = {
      showEditForm: false,
      menuLocation: '',
      pageDropdown: '',
      order: '',
      text: '',
      title: '',
      path: '',
    };
  }

  componentDidMount() {
    this.setState({ order: this.props.order });

    this.setState({ menuLocation: this.props.menu });

    this.setState({ text: this.props.text});

    this.setState({ title: this.props.title });

    this.setState({ path: this.props.path });

    if (!this.props.parent) {
      this.setState({ pageDropdown: 'None' });
    } else {
      this.setState({ pageDropdown: this.props.parent });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ menuLocation: nextProps.menu });

    this.setState({ order: nextProps.order });

    this.setState({ text: nextProps.text });

    this.setState({ title: nextProps.title });

    this.setState({ path: nextProps.path });

    if (!nextProps.parent) {
      this.setState({ pageDropdown: 'None' });
    } else {
      this.setState({ pageDropdown: nextProps.parent });
    }
  }

  onClick() {
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  onPageSelect(event) {
    this.setState({ pageDropdown: event });
  }

  handleSelect(event) {
    this.setState({ menuLocation: event });
  }

  orderChange(event) {
    this.setState({ order: event.target.value });
  }

  textChange(event) {
    this.setState({ text: event.target.value });
  }

  titleChange(event) {
    this.setState({ title: event.target.value });
  }

  pathChange(event) {
    this.setState({ path: event.target.value });
  }

  deleteThisPost() {
    if (this.props.type === 'post') {
      Meteor.call('posts.remove', this.props._id);
    } else if (this.props.type === 'page') {
      Meteor.call('pages.remove', this.props._id);
    }
    FlowRouter.go(FlowRouter.path('/'));
  }

  updateCollection() {
    const text = this.state.text;
    const title = this.state.title;
    const path = this.state.path;
    if (this.props.type === 'post') {
      Meteor.call('posts.update', this.props._id, title, text, path);
    } else if (this.props.type === 'page') {

      const location = this.state.menuLocation;
      const order = this.state.order;
      const intOrder = parseInt(order);
      let parent = null;

      this.props.pages.map((page) => {
        if (page.title === this.state.pageDropdown) {
          parent = page._id;
        }
      });

      Meteor.call('pages.update', this.props._id, title, text, path, location, parent, intOrder);
    }
    this.setState({ showEditForm: false });
  }

  renderPagesDropdown() {
    return this.props.pages.map((page) => {
      return <MenuItem eventKey={page.title} key={page._id}>{page.title}</MenuItem>
    });
  }

  render() {
    return (
      <div className="post-text">
        <div className="post-container">
          <div className="post-content">
            <Down content={this.state.text} />
          </div>
        </div>

        {this.state.showEditForm
          ? <div className="edit-inputs">
            <input type="text" ref="title" value={this.state.title} onChange={this.titleChange}/> <br />
            <textarea ref="textInput" value={this.state.text} onChange={this.textChange} placeholder="'Hello! This is my page!'" rows={4} cols="50" />
            <br />
            <input type="text" ref="path" value={this.state.path} onChange={this.pathChange} />
          </div>
          : null
        }
        { this.props.menu && this.state.showEditForm
          ?
          <div className="page-edit-options">
            <span>Menu Location:</span>
            <DropdownButton title={this.state.menuLocation} onSelect={this.handleSelect} id="21">
              <MenuItem eventKey={'None'}>None</MenuItem>
              <MenuItem eventKey={'Main'}>Main</MenuItem>
              <MenuItem eventKey={'Sidebar'}>Sidebar</MenuItem>
              <MenuItem eventKey={'Footer'}>Footer</MenuItem>
            </DropdownButton>
            <span>Parent:</span>
            <DropdownButton title={this.state.pageDropdown} onSelect={this.onPageSelect} id="8">
              <MenuItem eventKey={'None'}>None</MenuItem>
              {this.renderPagesDropdown()}
            </DropdownButton>
            <span>Order:</span>
            <input
              type="text"
              placeholder="Order"
              value={this.state.order}
              onChange={this.orderChange}
              ref="order"
            />
          </div>
          : null
        }
        <div className="owner-controls">
          <Button bsStyle="primary" className="edit" onClick={this.onClick}>Edit</Button>
          {this.state.showEditForm
            ?
            <div className="edit-buttons">
              <Button bsStyle="success"className="save-button" onClick={this.updateCollection}>Save</Button>
              <Button bsStyle="danger" className="delete" onClick={this.deleteThisPost}>Delete</Button>
            </div>
          : null
          }
        </div>

        <a href="/">Home</a>
      </div>
    );
  }
}

export default Post;
