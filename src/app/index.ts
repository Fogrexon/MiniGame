import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -5;
camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
  }
);

renderer.setSize(window.innerWidth, window.innerHeight);
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
);
scene.add(mesh);
renderer.render(scene, camera);

setInterval(() => {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}, 1000 / 60)
