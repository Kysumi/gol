import * as PIXI from 'pixi.js';
import { gol } from './app';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    //Create a Pixi Application
    let app = new PIXI.Application({
      width: 640,
      height: 480,
      antialias: true,
      resolution: 1,
    });
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = 0xffffff;
    gol(app);
  }
}

customElements.define('bestagon-root', AppElement);
