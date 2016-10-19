import Meteor from 'meteor/meteor';
let Images = new FilesCollection({
    collectionName: 'Images',
    storagePath: '../../../../../data'
});

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function () {
        return Images.collection.find({});
    });
}

export default Images;