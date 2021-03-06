import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });
}

Meteor.methods({
  'posts.insert'(text, title, path, template) {
    check(text, String);
    check(title, String);
    check(path, String);
    check(template, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      text,
      title,
      path,
      template,
      createdAt: new Date().getTime(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'posts.remove'(taskId) {
    check(taskId, String);

    Posts.remove(taskId);
  },
  'posts.update'(taskId, title, text, path) {
    check(taskId, String);
    check(title, String);
    check(text, String);
    check(path, String);

    Posts.update(taskId, {
      $set: {
        text: text,
        title: title,
        path: path,
      },
    });
  },
});
