import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'posts.insert'(text, title, path, template) {
    check(text, String);
    check(title, String);
    check(path, String);
    check(template, Number);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      text,
      title,
      path,
      template,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'posts.remove'(taskId) {
    check(taskId, String);

    Posts.remove(taskId);
  },
  'posts.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Posts.update(taskId, { $set: { checked: setChecked } });
  },
});

export const Posts = new Mongo.Collection('posts');