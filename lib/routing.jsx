import React from 'react';
import { mount } from 'react-mounter';
import App from '/imports/ui/App.jsx';
import TemplateSelector from '/imports/ui/templateSelector.jsx';
import PostTagRenderer from '/imports/ui/components/post/PostTagRenderer.jsx';
import MenuComponent from '/imports/ui/components/menu.old/menuComponent.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  subscriptions: function () {
    this.register('files', Meteor.subscribe('files'));
  },
  action: function () {
    mount(App);
  },
});

FlowRouter.route('/posts/', {
  name: 'posts',
  subscriptions: function () {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action() {
    mount(App, { yield: <PostTagRenderer /> });
  },
});

FlowRouter.route('/posts/:id', {
  name: 'posts',
  subscriptions: function () {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action(params) {
    mount(App, { yield: <TemplateSelector pathLink={params.id} type="post"/> });
  },
});

FlowRouter.route('/:id', {
  name: 'page-edit',
  subscriptions: function () {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action(params) {
    mount(App, { yield: <TemplateSelector pathLink={params.id} type="page"/> });
  },
});

FlowRouter.route('/pages-primary/', {
  name: 'pages-primary',
  subscriptions: function () {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action() {
    mount(App, { yield: <MenuComponent location="primary" /> });
  },
});

FlowRouter.route('/pages-sidebar/', {
  name: 'pages-sidebar',
  subscriptions: function () {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action() {
    mount(App, { yield: <MenuComponent location="sidebar" /> });
  },
});

FlowRouter.route('/pages-footer/', {
  name: 'pages-footer',
  subscriptions: function () {
    this.register('pages', Meteor.subscribe('pages'));
  },
  action() {
    mount(App, { yield: <MenuComponent location="footer" /> });
  },
});
