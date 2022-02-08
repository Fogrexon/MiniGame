import { OrthographicCamera, Scene, Vector3, WebGLRenderer } from "three";

export class Game {
  private renderer: WebGLRenderer;

  private camera: OrthographicCamera;

  private scene: Scene;

  private intervalId: NodeJS.Timer | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const aspect = window.innerWidth / window.innerHeight;
    const height = 10;
    this.camera = new OrthographicCamera(
      - height * aspect/ 2,
      height * aspect / 2,
      height / 2,
      -height / 2,
    );
    this.camera.position.z = -5;
    this.camera.lookAt(new Vector3(0.0, 0.0, 0.0))
    this.scene = new Scene();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.left = -window.innerWidth / 2;
      this.camera.right = window.innerWidth / 2;
      this.camera.top = window.innerHeight / 2;
      this.camera.bottom = -window.innerHeight / 2;
      this.camera.updateProjectionMatrix();
    })
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
    this.renderer.render(this.scene, this.camera);
  }
}