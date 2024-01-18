// Imports
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DragControls } from "three/addons/controls/DragControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialization of Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

// Event Listener to resize automatically the window
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Assets Imports
const floor = new THREE.TextureLoader().load("../assets/Material_1861.jpg");
const cylinderMetal = new THREE.TextureLoader().load(
  "../assets/Metal_Plate_Cylinder.jpg"
);
const sphereMetal = new THREE.TextureLoader().load("../assets/MetalSphere.jpg");
const boxPlate = new THREE.TextureLoader().load("../assets/MetalPlate.jpg");
const boxSquare = new THREE.TextureLoader().load("../assets/MetalSquare.jpg");
const boxMetal = new THREE.TextureLoader().load("../assets/MetalBox.jpg");

// Plane Definition
function PlaneConstructor() {
  this.geometry = new THREE.PlaneGeometry(100, 100);
  this.material = new THREE.MeshBasicMaterial({
    map: floor,
    // roughness: 7,
    // metalness: 5,
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

// Start of Arm Bottom to Top
// First Cylinder
const geometryCylinder = new THREE.CylinderGeometry(5, 5, 10, 32);
const materialCylinder = new THREE.MeshBasicMaterial({
  map: cylinderMetal,
});
const meshCylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
let axesFcylinder = new THREE.AxesHelper(18);
meshCylinder.add(axesFcylinder);
scene.add(meshCylinder);

// First Sphere
const geometrySphere = new THREE.SphereGeometry(5, 64, 32);
const materialSphere = new THREE.MeshBasicMaterial({ map: sphereMetal });
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
let axesFsphere = new THREE.AxesHelper(18);
sphere.add(axesFsphere);
sphere.position.y = 7;
meshCylinder.add(sphere);

// Second Cylinder
const lowerArmGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
const lowerArmMaterial = new THREE.MeshBasicMaterial({ map: cylinderMetal });
const lowerArmMesh = new THREE.Mesh(lowerArmGeometry, lowerArmMaterial);
let axesScylinder = new THREE.AxesHelper(18);
lowerArmMesh.add(axesScylinder);
sphere.add(lowerArmMesh);
lowerArmMesh.position.y = 8;
lowerArmMesh.position.x = 0;
// this.lowerArmMesh.add(axesHelper);

// Second Sphere
const secondArticulation = new THREE.SphereGeometry(5, 64, 32);
const secondArticulationMaterial = new THREE.MeshBasicMaterial({
  map: sphereMetal,
});
const sphereArticulation = new THREE.Mesh(
  secondArticulation,
  secondArticulationMaterial
);
sphereArticulation.position.y = 8;
let axesSsphere = new THREE.AxesHelper(18);
sphereArticulation.add(axesSsphere);
lowerArmMesh.add(sphereArticulation);

// let secondArticulationHelper = new THREE.AxesHelper(15);
// this.sphereArticulation.add(secondArticulationHelper);
// this.pivot.add(this.sphereArticulation);

// Third Cylinder
const upperArmGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
const upperArmMaterial = new THREE.MeshBasicMaterial({ map: cylinderMetal });
const upperArmMesh = new THREE.Mesh(upperArmGeometry, upperArmMaterial);
// upperArmMesh.add(axesHelper);
upperArmMesh.position.y = 8;
upperArmMesh.position.x = 0;
// pivot.add(upperArmMesh);
let axesTcylinder = new THREE.AxesHelper(18);
upperArmMesh.add(axesTcylinder);
sphereArticulation.add(upperArmMesh);

// Third Sphere
const firstArticulation = new THREE.SphereGeometry(5, 64, 32);
const firstArticulationMaterial = new THREE.MeshBasicMaterial({
  map: sphereMetal,
});
const firstSphereArticulation = new THREE.Mesh(
  firstArticulation,
  firstArticulationMaterial
);
firstSphereArticulation.position.y = 8;
upperArmMesh.add(firstSphereArticulation);

// Left Claw
const leftClaw = new THREE.BoxGeometry(3, 10, 1);
const leftCMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const leftCMesh = new THREE.Mesh(leftClaw, leftCMaterial);
leftCMesh.position.y = 1;
leftCMesh.position.z = 3;
leftCMesh.position.x = 8;

leftCMesh.rotation.z = 8;
leftCMesh.rotation.x = 0;
firstSphereArticulation.add(leftCMesh);

// Right Claw
const rightClaw = new THREE.BoxGeometry(3, 10, 1);
const rightCMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const rightCMesh = new THREE.Mesh(rightClaw, rightCMaterial);
rightCMesh.position.y = 1;
rightCMesh.position.z = -3;
rightCMesh.position.x = 8;

rightCMesh.rotation.z = 8;
rightCMesh.rotation.x = 0;
firstSphereArticulation.add(rightCMesh);

window.addEventListener("mouseup", () => {
  leftCMesh.position.x = -20;
  rightCMesh.position.y = 20;
});

window.addEventListener("mousedown", () => {
  leftCMesh.position.x = 20;
  rightCMesh.position.y = -20;
});

// let firstArticulationHelper = new THREE.AxesHelper(15);
// this.firstSphereArticulation.add(firstArticulationHelper);
// this.pivot.add(this.firstSphereArticulation);

// Cylinder Definition
// function CylinderConstructor() {
//   let axesHelper = new THREE.AxesHelper(18);
//   this.mesh.add(axesHelper);

//   this.pivot = new THREE.Group();
//   this.pivot.add(this.mesh);

//   this.pivot.add(this.lowerArmMesh);
//   scene.add(this.pivot);

//   scene.add(this.pivot);
// }

// let customPositionCylinder = new CylinderConstructor({
//   position: new THREE.Vector3(0, 0, 0),
// });

// function EdgesConstructor() {}

// CylinderConstructor.prototype.update = () => {};

// Sphere Definition
// function SphereConstructor() {
//   let axesHelper = new THREE.AxesHelper(15);
//   this.sphere.add(axesHelper);

//   this.pivot = new THREE.Group();
//   this.pivot.add(this.sphere);

//   scene.add(this.sphere);
//   scene.add(this.pivot);
// }

// let customPositionSphere = new SphereConstructor({
//   position: new THREE.Vector3(0, 0, 0),
// });

// SphereConstructor.prototype.update = () => {};

// Box Definition
function BoxConstructor() {
  // First Box
  this.geometry = new THREE.BoxGeometry(10, 10, 10);
  this.material = new THREE.MeshBasicMaterial({
    map: boxPlate,
  });
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.x = 35;
  this.cube.position.y = 0;

  // Second Box
  this.boxSquareGeometry = new THREE.BoxGeometry(10, 10, 10);
  this.boxSquareMaterial = new THREE.MeshBasicMaterial({
    map: boxSquare,
  });
  this.boxSquareCube = new THREE.Mesh(
    this.boxSquareGeometry,
    this.boxSquareMaterial
  );
  this.boxSquareCube.position.x = 35;
  this.boxSquareCube.position.y = 0;
  this.boxSquareCube.position.z = 15;

  // Third Box
  this.thirdBox = new THREE.BoxGeometry(10, 10, 10);
  this.thirdBoxMaterial = new THREE.MeshBasicMaterial({ map: boxMetal });
  this.thirdCube = new THREE.Mesh(this.thirdBox, this.thirdBoxMaterial);
  this.thirdCube.position.y = 0;
  this.thirdCube.position.x = 35;
  this.thirdCube.position.z = -15;
  scene.add(this.cube, this.boxSquareCube, this.thirdCube);
}

let customPositionCube = new BoxConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

// Camera Position
camera.position.set(0, 20, 100);
controls.update();

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
