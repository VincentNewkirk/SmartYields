import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import { FilesCollection } from 'meteor/ostrio:files';


import './main.html';

import App from '../imports/ui/App.jsx';

// Meteor.startup(() => {
//   render(<App />, document.getElementById('render-target'));
// });

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    console.log('meteor is server')
    return Images.find().cursor;
  });
}
