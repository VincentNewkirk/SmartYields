import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Files = new Mongo.Collection('files');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('files', function postsPublication() {
    return Files.find();
  });
}

Meteor.methods({
  'files.insert'(title, path, altText) {
    check(title, String);
    check(path, String);
    check(altText, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Files.insert({
      title,
      path,
      createdAt: new Date().getTime(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'files.remove'(taskId) {
    check(taskId, String);

    Files.remove(taskId);
  },
});
