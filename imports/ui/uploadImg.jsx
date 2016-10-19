import React from 'react';
import { FilesCollection } from 'meteor/ostrio:files';

var Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});


class ImageUploader extends React.Component{
  render() {
    console.log(Images)
    return(
      <template name="uploadForm">
        <input id="fileInput" type="file" />
        <p><small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 10MB</small></p>
      </template>
    )
  }
}

export default ImageUploader