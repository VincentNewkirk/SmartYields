import React from 'react';
import App from '../imports/ui/App.jsx';
import Test from '../imports/ui/TestComponent.jsx';
import Post from '../imports/ui/Post.jsx'
import { Posts } from '../imports/api/posts.js';

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    ReactLayout.render( App, { yield: <h3>Pages</h3> });
  }
})

FlowRouter.route('/test', {
  name: 'test',
  action(){
    ReactLayout.render( App, {yield: <Test />});
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