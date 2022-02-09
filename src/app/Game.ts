import { OrthographicCamera, Scene, Vector3, WebGLRenderer } from "three";
import { ClickController } from "./ClickController";
import { IRenderable } from "./IRenderable";
import { Map } from "./Map";

export class Game implements IRenderable {
  private renderer: WebGLRenderer;

  private camera: OrthographicCamera;

  private scene: Scene;

  private intervalId: NodeJS.Timer | null = null;
  
  // gameObjects
  private map: Map;

  private clickController: ClickController;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const aspect = window.innerWidth / window.innerHeight;
    const height = 60;
    this.camera = new OrthographicCamera(
      - height * aspect/ 2,
      height * aspect / 2,
      height / 2,
      -height / 2,
    );
    this.camera.position.z = -200;
    this.camera.position.x = -200;
    this.camera.position.y = 200;
    this.camera.lookAt(new Vector3(0.0, 0.0, 0.0))
    this.scene = new Scene();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.left = - height * aspect/ 2;
      this.camera.right =height * aspect / 2;
      this.camera.top = height / 2;
      this.camera.bottom = -height / 2;
      this.camera.updateProjectionMatrix();
    })

    // gameObjects
    this.map = new Map(100, 100);
    this.scene.add(this.map);
    this.clickController = new ClickController(this.map, this.camera, canvas);
  }

  public getScene() {
    return this.scene;
  }

  public start() {
    this.intervalId = setInterval(this.render.bind(this), 1000 / 60);
  }

  public pause() {
    if(this.intervalId)clearInterval(this.intervalId);
  }

  public render() {
    this.map.prerender();

    this.map.render();
    this.renderer.render(this.scene, this.camera);
  
    // postrender
  }
}