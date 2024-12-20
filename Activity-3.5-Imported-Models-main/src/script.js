import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize the scene with a background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4b5563);

// Set up the camera with perspective view
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.5, 6);

// WebGL renderer for 3D content
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Orbit controls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add lighting to the scene
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(10, 15, 10);
scene.add(light);

// Create ground plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x374151 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Animation function to continuously render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Event listeners for user interactions
document.getElementById('color-picker').addEventListener('input', (event) => {
    scene.background.set(event.target.value);
});

document.getElementById('light-level').addEventListener('input', (event) => {
    light.intensity = parseFloat(event.target.value);
});

document.getElementById('reset-button').addEventListener('click', () => {
    scene.background.set(0x4b5563);
    light.intensity = 2;
    document.getElementById('color-picker').value = '#4b5563';
    document.getElementById('light-level').value = 2;
});

// Resize handling for responsive design
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
