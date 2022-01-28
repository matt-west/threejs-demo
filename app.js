// import * as THREE from "./node_modules/three/build/three.module.js";
// import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";

const rollSlider = document.querySelector(".roll");
const pitchSlider = document.querySelector(".pitch");
const yawSlider = document.querySelector(".yaw");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let model;

function init() {
  const loader = new GLTFLoader();

  loader.load(
    "./model/scene.gltf",
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(-3, 10, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  camera.position.z = 10;
}

init();

function animate() {
  requestAnimationFrame(animate);

  // Roll
  model.rotation.x = rollSlider.value * -1;

  // Yaw
  model.rotation.y = yawSlider.value * -1;

  // Pitch
  model.rotation.z = pitchSlider.value * -1;

  renderer.render(scene, camera);
}
animate();
