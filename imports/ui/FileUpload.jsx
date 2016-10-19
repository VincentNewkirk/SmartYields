import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Images from '../../lib/images.js';

class ImgUploader extends Component {

    handleSubmit(event) {
        event.preventDefault();
        if(ReactDOM.findDOMNode(this.refs.testfile).files && ReactDOM.findDOMNode(this.refs.testfile).files[0]) {

            let upload = Images.insert({
                file: ReactDOM.findDOMNode(this.refs.testfile).files[0],
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
                    alert('File '+fileObj.name+' successfully uploaded');
                }
            });

            upload.start();
        }
    }

    render() {
        return(
            <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                <input type="file" ref="testfile" size="50" />
                <input type="submit" />
            </form>
        )
    }

}

export default ImgUploader;