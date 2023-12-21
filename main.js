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

function PlaneConstructor() {
  this.geometry = new THREE.PlaneGeometry(30, 30);
  this.material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
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
}

let customPositionCylinder = new CylinderConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

CylinderConstructor.prototype.update = () => {};

// First Articulation Cylinder
// const articulationCylinderGeometry = new THREE.CylinderGeometry(5, 5, 9, 32);
// const materialArticulationCylinder = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });
// const cylinderArticulationMesh = new THREE.Mesh(
//   articulationCylinderGeometry,
//   materialArticulationCylinder
// );
// cylinderArticulationMesh.position.y = 10;
// cylinderArticulationMesh.rotation.x = Math.PI / 2;

// scene.add(cylinderArticulationMesh);

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
