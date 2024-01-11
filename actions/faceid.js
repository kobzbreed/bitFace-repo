/* MAIN SCRIPT 
   TO HANDLE FACIAL RECOGNITION
   AND THE REST
*/

//setting up
(async () => {
    await faceapi.loadSsdMobilenetv1Model(_face_models)
    setProgressOptions({id:'face_id_progress', value:'Setting up (45%)', type:'text'})
    setProgressOptions({id:'face_id_progress', value:'45%', type:'progress'})
    await faceapi.loadFaceLandmarkModel(_face_models)
    setProgressOptions({id:'face_id_progress', value:'Setting up (75%)', type:'text'})
    setProgressOptions({id:'face_id_progress', value:'75%', type:'progress'})
    await faceapi.loadFaceRecognitionModel(_face_models)
    setProgressOptions({id:'face_id_progress', value:'Setting up (100%)', type:'text'})
    setProgressOptions({id:'face_id_progress', value:'100%', type:'progress'})
    await new Promise(resolve => setTimeout(resolve, 800))
    //remove progress bar
    remove('face_id_progress')
    
    //set up the camera
    setUpCamera()
})()

const setUpCamera = () => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.width = E('face_id_section').clientWidth
    canvas.height = video.height = E('face_id_section').clientHeight
    const ctx = canvas.getContext('2d');
    video.autoplay = true

    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        talk('Error accessing webcam:', 'fail');
    });

        // // Draw video frames on the canvas
        // function drawFrame() {
        //     context.drawImage(video, 0, 0, canvas.width, canvas.height);
        //     requestAnimationFrame(drawFrame);
        // }

        // // Start drawing frames when the video is playing
        // video.addEventListener('play', () => {
        //     drawFrame();
        // });
}
