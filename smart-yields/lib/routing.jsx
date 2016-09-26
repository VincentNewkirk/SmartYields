import React from 'react';
import App from '../imports/ui/App.jsx';
import Post from '../imports/ui/Post.jsx'
import Tags from '../imports/ui/Tags.jsx';
import { Posts } from '../imports/api/posts.js';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    ReactLayout.render( App, { yield: <Tags /> });
  }
})


FlowRouter.route('/:category/:id', {
  name: 'posts',
  subscriptions: function(params) {
    this.register('posts', Meteor.subscribe('posts', params.id));
  },
  action(params){
    ReactLayout.render( App, {yield: <Post id={params.id} />})
  }
})