import React from 'react';
import { Meteor } from 'meteor/meteor';
import Images from '../../../lib/images.js';
import { Files } from '../../api/files.js';

class ImgUploader extends React.Component {
  constructor(){
    super();
    this.submitUpload = this.submitUpload.bind(this);
  }

  submitUpload(event) {
    if(this.refs.testfile.files && this.refs.testfile.files[0]) {

      let that = this;

      let upload = Images.insert({
          file: this.refs.testfile.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
      }, false);

      upload.on('start', function() {
        console.log('upload.on.start');
      });

      upload.on('end', function(error, fileObj) {
        if(error) {
          alert('Error during upload: ' + error);
        } else {
          let altText = that.refs.altText.value;
          let path = Images.link(fileObj);
          that.props.imgHandler(fileObj.name, path, altText);
          alert('File '+fileObj.name+' successfully uploaded');
        }
      });

      upload.start();
    }
  }

  render() {
    return(
      <div>
        <input type="file" ref="testfile" size="50" />
        <span>Alt Text:<input type="text" ref="altText" /></span>
        <input type="submit" onClick={this.submitUpload}/>
      </div>
    )
  }
}

export default ImgUploader
