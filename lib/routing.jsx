import React from 'react';
import {mount} from 'react-mounter';
import App from '../imports/ui/App.jsx';
import PostTags from '../imports/ui/PostTags.jsx';
import TemplateSelector from '../imports/ui/templateSelector.jsx';
import PostTagRenderer from '../imports/ui/PostTagRenderer.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    mount( App );
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
    mount( App, {yield: <TemplateSelector pathLink={params.id} />})
  }
})
