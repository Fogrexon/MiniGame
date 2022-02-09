import { Mesh, BoxGeometry, MeshBasicMaterial, Color, MeshStandardMaterial } from "three";
import { IRenderable } from "./IRenderable";

type Road = 'none' | 'vertical' | 'horizontal' | 'both' | 'building';
export class Block extends Mesh implements IRenderable {
  private road: Road = 'none';

  private postroad: Road = 'none';

  // eslint-disable-next-line no-use-before-define
  private blockGetter: (x: number, y: number) => Block;

  private x: number;

  private y: number;

  constructor(x: number ,y: number, getter: (x: number, y: number) => Block) {
    super(new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: Math.floor(Math.random() * 256 * 256 * 256) })
    );
    this.x = x;
    this.y = y;
    this.blockGetter = getter;
  }

  public onClick() {
    this.postroad = Math.random() > 0.5 ? 'vertical' : 'horizontal';
  }

  public getRoad() {
    return this.road;
  }

  public prerender() {

    if(this.road === 'both' || this.road === 'building') return
    if(this.road === 'vertical') {
      for(let dy = -1; dy < 2; dy += 2) {
        const block = this.blockGetter(this.x, this.y + dy);
        if(block && block.getRoad() === 'building') {
          return;
        }
      }
      this.postroad = Math.random() < 0.998 ? this.road : 'both';
      return; 
    }
    if(this.road === 'horizontal') {
      for(let dx = -1; dx < 2; dx += 2) {
        const block = this.blockGetter(this.x + dx, this.y);
        if(block && block.getRoad() === 'building') {
          return;
        }
      }
      this.postroad = Math.random() < 0.998 ? this.road : 'both';
      return; 
    }

    for(let dx = -1; dx < 2; dx += 2) {
      const block = this.blockGetter(this.x + dx, this.y);
      if(block) {
        const road = block.getRoad();
        if((road === 'horizontal' || road === 'both') && Math.random() < 0.03) {
          // this.postroad = Math.random() < 0.95 ? 'horizontal' : 'both';
          this.postroad = 'horizontal';
        } else if(road === 'vertical' && Math.random() < 0.02) {
          this.postroad = 'building';
        }
      }
    }
    for(let dy = -1; dy < 2; dy += 2) {
      const block = this.blockGetter(this.x, this.y + dy);
      if(block) {
        const road = block.getRoad();
        if((road === 'vertical' || road === 'both') && Math.random() < 0.03) {
          // this.postroad = Math.random() < 0.95 ? 'vertical' : 'both';
          this.postroad = 'vertical';
        } else if(road === 'horizontal' && Math.random() < 0.02) {
          this.postroad = 'building';
        }
      }
    }
  }
  
  public render() {
    this.road = this.postroad;
    let value = 0;
    switch(this.road) {
      case 'vertical': {
        this.scale.x = 0.5;
        this.scale.y = 0.5;
        this.scale.z = 1;
        value = 1.0;
        break;
      }
      case 'horizontal': {
        this.scale.x = 1;
        this.scale.y = 0.5;
        this.scale.z = 0.5;
        value = 1.0;
        break;
      }
      case 'both': {
        this.scale.x = 1;
        this.scale.y = 0.5;
        this.scale.z = 1;
        value = 1.0;
        break;
      }
      case 'building': {
        this.scale.x = 1;
        this.scale.y = Math.sin(this.x) * Math.cos(this.y) * 3 + 1;
        this.scale.z = 1;
        value = 0.5;
        break;
      }
      default: {
        this.scale.x = 1;
        this.scale.y = 0.5;
        this.scale.z = 1;
        value = 0.1;
        break;
      }
    }
    (this.material as MeshBasicMaterial).color = new Color(value, value, value);
  }
}