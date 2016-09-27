import React from 'react';
import {mount} from 'react-mounter';
import { Posts } from '../imports/api/posts.js';
import App from '../imports/ui/App.jsx';
import Post from '../imports/ui/Post.jsx'
import Tags from '../imports/ui/Tags.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    mount( App, { yield: <Tags /> });
  }
})


FlowRouter.route('/:category/:id', {
  name: 'posts',
  subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts', params.id));
  },
  action(params){
    mount( App, {yield: <Post id={params.id} />})
  }
})