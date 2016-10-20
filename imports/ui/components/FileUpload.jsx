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
          let path = Images.link(fileObj);
          that.props.imgHandler(fileObj.name, path);
          alert('File '+fileObj.name+' successfully uploaded');
        }
      });

      upload.start();
    }
  }

  renderImgListing(){
    return this.props.images.map(img => (
      <div>
        <p>{img.title}</p>
      </div>
    ));
  }

  render() {
    return(
      <div>
        <input type="file" ref="testfile" size="50" />
        <span>Alt Text:<input type="text" ref="alt-text" /></span>
        <input type="submit" onClick={this.submitUpload}/>
        {
          this.props.images ?
          this.renderImgListing()
          :null
        }
      </div>
    )
  }
}

// export default createContainer(() => {
//   Meteor.subscribe('Images');
//   console.log(Images.find(), 'cursor')
//   return {
//     images: Images.find({}).fetch(),
//   };
// }, ImgUploader);

export default ImgUploader
