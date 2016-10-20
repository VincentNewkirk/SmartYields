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
                Meteor.call('files.insert', fileObj.name, Images.link(fileObj))
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
            <span>Alt Text:<input type="text" ref="alt-text" /></span>
            <input type="submit" onClick={this.submitUpload}/>
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
