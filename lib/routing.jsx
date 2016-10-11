import React from 'react';
import {mount} from 'react-mounter';
import App from '../imports/ui/App.jsx';
import PostTags from '../imports/ui/PostTags.jsx';
import TemplateSelector from '../imports/ui/templateSelector.jsx';
import PostTagRenderer from '../imports/ui/PostTagRenderer.jsx';
import MenuTemplate from '../imports/ui/menuTemplate.jsx';
import MyEditor from '../imports/ui/TestEditor.jsx';
import MenuComponent from '../imports/ui/menuComponent.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    mount( App, {yield: <MyEditor />} );
  }
})


FlowRouter.route('/posts/', {
  name: 'posts',
  subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action(params){
    mount( App, {yield: <PostTagRenderer />})
  }
})

FlowRouter.route('/posts/:id', {
  name: 'posts',
  subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action(params){
    mount( App, {yield: <TemplateSelector pathLink={params.id} type="post"/>})
  }
})

FlowRouter.route('/page/:id', {
  name: 'page-edit',
  subscriptions: function(params) {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action(params){
    mount( App, {yield: <TemplateSelector pathLink={params.id} type="page"/>})
  }
})

FlowRouter.route('/pages-primary/', {
  name: 'pages-primary',
  subscriptions: function(params) {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action(params){
    mount( App, {yield: <MenuComponent location="primary" />})
  }
})
