import { Mesh, BoxGeometry, MeshBasicMaterial, Color } from "three";
import { IRenderable } from "./IRenderable";

export class Block extends Mesh implements IRenderable {
  private elevated = false;

  private light = 0;

  private postlight = 0;

  private lightHistory = [0, 0];

  // eslint-disable-next-line no-use-before-define
  private blockGetter: (x: number, y: number) => Block;

  private x: number;

  private y: number;

  constructor(x: number ,y: number, getter: (x: number, y: number) => Block) {
    super(new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: Math.floor(Math.random() * 256 * 256 * 256) })
    );
    this.x = x;
    this.y = y;
    this.blockGetter = getter;
  }

  public onClick() {
    this.light = 5;
  }

  public getLight() {
    return this.light;
  }

  public prerender() {

    let sum = 0;
    for(let dx = -1; dx < 2; dx += 2) {
      const block = this.blockGetter(this.x + dx, this.y);
      if(block) sum += block.getLight();
      else sum += -this.light;
    }
    for(let dy = -1; dy < 2; dy += 2) {
      const block = this.blockGetter(this.x, this.y + dy);
      if(block) sum += block.getLight();
      else sum += -this.light;
    }
    this.postlight = 2 * this.light - this.lightHistory[0] + (4 / 60 / 60 / 0.1 / 0.1) * (sum - this.light * 4);
    // this.postlight *= 0.99;

  }
  
  public render() {
    this.lightHistory = [this.light, this.lightHistory[0]];
    this.light = this.postlight;
    this.position.y = this.light;
    const value = this.light ** 32;
    (this.material as MeshBasicMaterial).color = new Color(value, value, value);
  }
}