import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Images from '../../../lib/images.js';
import { Files } from '../../api/files.js';

class ImgUploader extends React.Component {
  constructor(){
    super();
    this.submitUpload = this.submitUpload.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.state = {
      alertVisible: false,
    }
  }

  submitUpload(event) {
    if (this.refs.testfile.files && this.refs.testfile.files[0]) {

      let that = this;

      let upload = Images.insert({
          file: this.refs.testfile.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
      }, false);

      upload.on('start', function() {

      });

      upload.on('end', function(error, fileObj) {
        if(error) {
          alert('Error during upload: ' + error);
        } else {
          let altText = that.refs.altText.value;
          let path = Images.link(fileObj);
          that.props.imgHandler(fileObj.name, path, altText);
          that.setState({ alertVisible: true });
        }
      });

      upload.start();
    }
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  render() {
    return(
      <div>
        <input type="file" ref="testfile" size="50" />
        <span>Alt Text:<input type="text" ref="altText" /></span>
        <input type="submit" onClick={this.submitUpload}/>
        { this.state.alertVisible ?
          <Alert bsStyle="success">
            <h4>Image Successfully Uploaded!</h4>
            <Button onClick={this.handleAlertDismiss}>Dismiss</Button>
          </Alert>
          : null
        }
      </div>
    )
  }
}

export default ImgUploader
