import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Pages = new Mongo.Collection('pages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('pages', function pagesPublication() {
    return Pages.find();
  });
}

Meteor.methods({
  'pages.insert'(title, path, text, template, menu, order, parent) {
    check(text, String);
    check(title, String);
    check(path, String);
    check(template, String);
    check(menu, String);
    check(order, Number);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Pages.insert({
      text,
      title,
      path,
      template,
      menu,
      order,
      parent,
      createdAt: new Date().getTime(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'pages.remove'(taskId) {
    check(taskId, String);

    Pages.remove(taskId);
  },
  'pages.update'(taskId, title, text, path, location, parent, order) {
    check(taskId, String);
    check(title, String);
    check(text, String);
    check(path, String);
    check(order, Number);

    Pages.update(taskId, {
      $set: {
        text: text,
        title: title,
        path: path,
        menu: location,
        order: order,
        parent: parent,
      },
    });
  },
});
