import * as THREE from 'three';
import { Game } from './Game';

const game = new Game(document.getElementById('canvas') as HTMLCanvasElement);

game.start();
