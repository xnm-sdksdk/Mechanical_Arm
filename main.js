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
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const materialPlane = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, materialPlane);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);

// Base Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
const materialCylinder = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, materialCylinder);
scene.add(cylinderMesh);

camera.position.set(0, 20, 100);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
