import Meteor from 'meteor/meteor';
let Images = new FilesCollection({
    collectionName: 'Images',
    storagePath: '../../../../../data',
    onAfterUpload: function(fileRef){
      console.log(fileRef)
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function () {
      console.log(Images.find(), 'LIB')
        return Images.collection.find({});
    });
}

export default Images;