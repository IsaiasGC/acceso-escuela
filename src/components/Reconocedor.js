import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
// import md5 from 'md5';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';


// const MySwal = withReactContent(Swal);
class Reconocedor extends Component {
    state = {
        constraints: { audio: false, video: { width: 480, height: 320 } }
    };

    video = React.createRef();
    localStream;
    reconocer = () => {

    }
    loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./modelsFace'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./modelsFace'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./modelsFace'),
            // faceapi.nets.faceExpressionNet.loadFromUri('./modelsFace'),
            // faceapi.nets.ageGenderNet.loadFromUri('./modelsFace')
        ]).then(this.load());
    }
    load = () => {
        const video = this.video.current;
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getUserMedia(
            { video: {} },
            stream => { video.srcObject = stream; this.localStream = stream; },
            err => console.log(err)
        );
        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.getElementsByClassName('here')[0].appendChild(canvas);
            const displaySize = this.state.constraints.video;
            faceapi.matchDimensions(canvas, displaySize);
            setInterval(async () => {
                const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                this.stop();
            }, 300);
        });
    }
    stop = () => {
        this.video.current.pause();
        this.video.current.src = "";
        this.localStream.getTraks[0].stop();
    }
    render() {
        return (
            <React.Fragment>
                <Row className="justify-content-md-center mb-4">
                    <Col className="mt-4" md="4">
                        <Button onClick={this.loadModels} className="btn btn-primary btn-block">
                            Autorizar <i className="fas fa-sign-in-alt 2x"></i>
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-lg-center justify-content-md-center">
                    <Col className="mt-4 here" lg="6" md="4">
                        <video ref={this.video} style={{ width: this.state.constraints.video.width, height: this.state.constraints.video.height, position: 'absolute', marginLeft: '0' }} autoPlay muted></video>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default withRouter(Reconocedor);
