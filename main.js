import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Plane
const floor = new THREE.TextureLoader().load("../assets/Material_1861.jpg");

function PlaneConstructor() {
  this.geometry = new THREE.PlaneGeometry(100, 100);
  this.material = new THREE.MeshBasicMaterial({
    map: floor,
    roughness: 7,
    metalness: 5,
  });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(0, -5, 0);
  this.mesh.rotation.x = -Math.PI / 2;
  scene.add(this.mesh);
}

let customPositionPlane = new PlaneConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

PlaneConstructor.prototype.update = () => {};

function CylinderConstructor() {
  this.geometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  scene.add(this.mesh);

  let axesHelper = new THREE.AxesHelper(10);
  this.mesh.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.mesh);

  this.lowerArmGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.lowerArmMaterial = new THREE.MeshBasicMaterial({ color: 0x234f1a });
  this.lowerArmMesh = new THREE.Mesh(
    this.lowerArmGeometry,
    this.lowerArmMaterial
  );
  this.lowerArmMesh.add(axesHelper);
  this.lowerArmMesh.position.y = 15;
  this.lowerArmMesh.position.x = 0;
  this.pivot.add(this.lowerArmMesh);
  scene.add(this.pivot);
}

let customPositionCylinder = new CylinderConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

function EdgesConstructor() {}

//! Pivot
//! Helper

CylinderConstructor.prototype.update = () => {};

function SphereConstructor() {
  this.geometry = new THREE.SphereGeometry(5, 64, 32);
  this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  this.sphere = new THREE.Mesh(this.geometry, this.material);
  this.sphere.position.y = 7;

  scene.add(this.sphere);

  let axesHelper = new THREE.AxesHelper(15);
  this.sphere.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.sphere);

  scene.add(this.pivot);
}

let customPositionSphere = new SphereConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

// scene.add(cylinderArticulationMesh);
// function createArm() {
//   var armGroup = new THREE.Group(); // Create a group to hold the entire arm

//   // Create upper arm geometry and material
//   var upperArmGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
//   var upperArmMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

//   // Create upper arm mesh
//   var upperArmMesh = new THREE.Mesh(upperArmGeometry, upperArmMaterial);
//   armGroup.add(upperArmMesh); // Add upper arm to the group

//   // Create lower arm geometry and material
//   var lowerArmGeometry = new THREE.CylinderGeometry(0.8, 0.8, 5, 32);
//   var lowerArmMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//   // Create lower arm mesh
//   var lowerArmMesh = new THREE.Mesh(lowerArmGeometry, lowerArmMaterial);
//   lowerArmMesh.position.y = -2.5; // Position lower arm relative to upper arm
//   armGroup.add(lowerArmMesh); // Add lower arm to the group

//   // Position the arm group
//   armGroup.position.set(0, 2.5, 0);

//   // Add the arm group to the scene
//   scene.add(armGroup);

//   return armGroup; // Return the group in case you need to reference it later
// }

// Create an arm
// var arm = createArm();

camera.position.set(0, 20, 100);
controls.update();

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // arm.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
