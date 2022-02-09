import { AmbientLight, DirectionalLight, Object3D, Scene } from "three";
import { Block } from "./Block";
import { IRenderable } from "./IRenderable";

export class Map extends Object3D implements IRenderable {
  private blocks: Block[][];

  constructor(width: number, height: number) {
    super();
    this.blocks = [];
    for (let x = 0; x < width; x+=1) {
      this.blocks[x] = [];
      for (let y = 0; y < height; y+=1) {
        this.blocks[x][y] = new Block(x, y, this.getBlock.bind(this) as (x: number, y: number) => Block);
        this.blocks[x][y].position.set(x - width / 2, 0, y - height / 2);
        this.add(this.blocks[x][y]);
      }
    }

    const directional = new DirectionalLight(0xffffff, 1);
    const ambient = new AmbientLight(0xffffff, 0.5);
    directional.position.set(-1, 4, -1);
    this.add(directional);
    this.add(ambient);
  }

  public getBlock(x: number, y: number) {
    if(x<0 || x>=this.blocks.length || y<0 || y>=this.blocks[0].length) return null;
    return this.blocks[x][y];
  }

  public prerender() {
    this.blocks.forEach(row => row.forEach(block => block.prerender()));
  }

  public render() {
    this.blocks.forEach(row => row.forEach(block => block.render()));
  }
}