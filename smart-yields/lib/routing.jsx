import React from 'react';
import App from '../imports/ui/App.jsx';
import Test from '../imports/ui/TestComponent.jsx';
import Post from '../imports/ui/Post.jsx'

FlowRouter.route('/', {
  name: 'landing page',
  action: function(params, queryParams){
    ReactLayout.render( App, { yield: '' });
  }
})

FlowRouter.route('/test', {
  name: 'test',
  action(){
    ReactLayout.render( App, {yield: <Test />});
  }
})

FlowRouter.route('/posts', {
  name: 'posts',
  action(){
    ReactLayout.render( App, {yield: <Post />})
  }
})