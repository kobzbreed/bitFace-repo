/* MAIN SCRIPT 
   TO HANDLE FACIAL RECOGNITION
   AND THE REST
*/

//setting up
(async () => {
    await faceapi.loadSsdMobilenetv1Model(_face_models)
    setProgressOptions({ id: 'face_id_progress', value: 'Setting up (45%)', type: 'text' })
    setProgressOptions({ id: 'face_id_progress', value: '45%', type: 'progress' })
    await faceapi.loadFaceLandmarkModel(_face_models)
    setProgressOptions({ id: 'face_id_progress', value: 'Setting up (75%)', type: 'text' })
    setProgressOptions({ id: 'face_id_progress', value: '75%', type: 'progress' })
    await faceapi.loadFaceRecognitionModel(_face_models)
    setProgressOptions({ id: 'face_id_progress', value: 'Setting up (100%)', type: 'text' })
    setProgressOptions({ id: 'face_id_progress', value: '100%', type: 'progress' })
    await new Promise(resolve => setTimeout(resolve, 800))
    //remove progress bar
    remove('face_id_progress')

    //set up the camera
    setUpCamera()
})()

const setUpCamera = () => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    video.autoplay = true
    const ctx = canvas.getContext('2d');

    //parametres
    let fw = 0; let fh = 0;
    resizeFun()

    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
        .then(stream => {
            video.srcObject = stream;

            video.onloadeddata = () => { resizeFun(); draw() }
            //draw the canvas in the div
            E('face_id_section').innerHTML = ""
            E('face_id_section').appendChild(canvas)

            function draw() {
                requestAnimationFrame(() => {
                    // Draw the image on the canvas
                    //setTimeout(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas on each frame
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.drawImage(video, Math.round((fw - canvas.width) / 2), 0, fw * -1, fh);
                    ctx.restore();
                    draw();
                    //}, 2000);
                });
            }
        })
        .catch(error => {
            talk('Error accessing webcam', 'fail');
        });

    //add resizing listener
    window.addEventListener('resize', (e) => {
        resizeFun()
    })

    function resizeFun() {
        //configuring video height
        canvas.width = video.width = E('face_id_section').clientWidth
        canvas.height = video.height = E('face_id_section').clientHeight
        let oRt = { height: screen.height / video.videoHeight, width: screen.width / video.videoWidth }
        let ct = Math.max(oRt.width, oRt.height)
        fw = video.videoWidth * ct
        fh = video.videoHeight * ct


    }
}