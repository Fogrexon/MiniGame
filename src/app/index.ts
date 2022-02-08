import * as THREE from 'three';
import { Game } from './Game';

const game = new Game(document.getElementById('canvas') as HTMLCanvasElement);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  );
game.getScene().add(mesh);
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, -3);
light.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
game.getScene().add(light);

game.start();
