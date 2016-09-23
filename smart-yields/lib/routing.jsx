import React from 'react';
import App from '../imports/ui/App.jsx';
import Test from '../imports/ui/TestComponent.jsx';

FlowRouter.route('/', {
  name: 'landing page',
  action(){
    ReactLayout.render( App, { yield: '' });
  }
})

FlowRouter.route('/test', {
  name: 'test',
  action(){
    ReactLayout.render( App, {yield: <Test />});
  }
});