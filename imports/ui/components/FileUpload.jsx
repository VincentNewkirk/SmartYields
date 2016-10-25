import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Images from '../../../lib/images.js';
import { Files } from '../../api/files.js';

class ImgUploader extends React.Component {
  constructor(){
    super();
    this.submitUpload = this.submitUpload.bind(this);
  }

  submitUpload(event) {
    if (this.refs.testfile.files && this.refs.testfile.files[0]) {

      let that = this;

      let upload = Images.insert({
          file: this.refs.testfile.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
      }, false);

      upload.on('end', function(error, fileObj) {
        if(error) {
          that.props.imgUploaded(false);
        } else {
          let altText = that.refs.altText.value;
          let path = Images.link(fileObj);
          that.props.imgHandler(fileObj.name, path, altText);
          that.props.imgUploaded(true);
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
