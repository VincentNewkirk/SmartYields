import React from 'react';
import {mount} from 'react-mounter';
import { Posts } from '../imports/api/posts.js';
import App from '../imports/ui/App.jsx';
import Post from '../imports/ui/Post.jsx'
import Tags from '../imports/ui/Tags.jsx';
import TestTemplate from '../imports/ui/testTemplate.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    mount( App, { yield: <Tags /> });
  }
})


FlowRouter.route('/:category/', {
  name: 'posts',
  subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action(params){
    mount( App, {yield: <TestTemplate pathLink={params.category} />})
  }
})

FlowRouter.route('/testT/test', {
  name:'test',
  action() {
    mount( App, {yield: <TestTemplate />})
  }
})