import { OrthographicCamera, Raycaster, Scene, Vector2 } from "three";
import { Block } from "./Block";
import { Map } from "./Map";

export class ClickController {
  
  private map: Map;
  
  private camera: OrthographicCamera;

  private canvas: HTMLCanvasElement;

  private raycaster: Raycaster;

  private pointer: Vector2;
  
  constructor(map: Map, camera: OrthographicCamera, canvas: HTMLCanvasElement) {
    this.map = map;
    this.canvas = canvas;
    this.camera = camera;
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();

    this.canvas.addEventListener('mousemove', this.onMousemove.bind(this));
    this.canvas.addEventListener('click', this.onClick.bind(this));
  }

  private onMousemove(event: MouseEvent) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  public onClick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.map.children);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const block = intersect.object as Block;
      block.onClick();
    }
  }
}