const video = document.getElementById("video");
const output = document.getElementById("output");
const assignProfileBtn = document.getElementById("assignProfileBtn");
const profileImgContainer = document.getElementById("profileImgContainer");

let isProfileAssigned = false;
let ageAndGenderData = null;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
  faceapi.nets.faceExpressionNet.loadFromUri("models"),
  faceapi.nets.ageGenderNet.loadFromUri("models"),
]).then(webCam);

function webCam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.log(error);
    });
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  faceapi.matchDimensions(canvas, { height: video.height, width: video.width });

  setInterval(async () => {
    const detection = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions().withAgeAndGender();

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const resizedDetections = faceapi.resizeResults(detection, {
      height: video.height,
      width: video.width,
    });

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    displayAgeAndGender(resizedDetections);
  }, 100);
});

function getProfileImage(age, gender) {
  let ageRange;
  if (age < 18) {
    ageRange = "baby_child";
  } else if (age < 60) {
    ageRange = "young_adult";
  } else {
    ageRange = "elder";
  }

  let genderPrefix = gender === "male" ? "male_" : "female_";
  let profileImage = `images/profilePics/custom/${genderPrefix}${ageRange}.png`;
  return profileImage;
}

function displayAgeAndGender(detections) {
  output.innerHTML = "";
  detections.forEach((det) => {
    const age = Math.round(det.age);
    const gender = det.gender.charAt(0).toUpperCase() + det.gender.slice(1);
    const p = document.createElement("p");
    p.textContent = `${age} year old ${gender}`;
    output.appendChild(p);

    ageAndGenderData = { age, gender };
  });
}

assignProfileBtn.addEventListener("click", () => {
  if (ageAndGenderData) {
    const { age, gender } = ageAndGenderData;
    const profileImage = getProfileImage(age, gender);
    renderProfileImage(profileImage);
    isProfileAssigned = true;
  }
});

function renderProfileImage(imageSrc) {
  profileImgContainer.innerHTML = "";
  const image = new Image();
  image.src = imageSrc;
  image.className = "profileImage";
  profileImgContainer.appendChild(image);
}
