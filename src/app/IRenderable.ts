export interface IRenderable {
  prerender?(): void;
  render(): void;
  postrender?(): void;
}