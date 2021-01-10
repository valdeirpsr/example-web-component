import main from "../scss/main.module.scss";
import template from "../html/template.html";

export default class VImage extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });

    this._template = document.createElement("template");
    this._template.innerHTML = template;

    this._image = this._template.content.querySelector("#img-original");
    this._image.addEventListener(
      "load",
      this._onImageOriginalLoaded.bind(this)
    );

    this._image_placeholder = this._template.content.querySelector(
      "#img-placeholder"
    );
  }

  connectedCallback() {
    this._buildStyle();
    this._buildDivEffect();

    if (!this._placeholder) {
      this._image_placeholder.remove();
    }

    if (this._alt) {
      this._image.alt = this._alt;
      this._figure.title = this._alt;
    }

    if (this._fit) {
      this._image.style.objectFit = this._fit;
    }

    if (this._fit_position) {
      this._image.style.objectPosition = this._fit_position;
    }

    this._image_placeholder.src = this._placeholder;
    this._image.src = this._source;

    this._root.appendChild(this._template.content);
  }

  static get observedAttributes() {
    return [
      "alt",
      "animation-first-word",
      "animation-second-word",
      "effect",
      "source",
      "fit",
      "fit-position"
    ];
  }

  get _alt() {
    return this.source || this.getAttribute("alt");
  }

  get _animationFirstWord() {
    return (
      this["animation-first-word"] || this.getAttribute("animation-first-word")
    );
  }

  get _animationFirstSecond() {
    return (
      this["animation-first-second"] ||
      this.getAttribute("animation-first-second")
    );
  }

  get _effect() {
    return this.effect || this.getAttribute("effect");
  }

  get _figure() {
    return this._template.content.querySelector("figure");
  }

  get _source() {
    return this.source || this.getAttribute("source");
  }

  get _fit() {
    return this.fit || this.getAttribute("fit");
  }

  get _fit_position() {
    return this.fit_position || this.getAttribute("fit_position");
  }

  get _placeholder() {
    return this.placeholder || this.getAttribute("placeholder");
  }

  get _position() {
    return this.position || this.getAttribute("position");
  }

  _buildStyle() {
    const css = document.createElement("style");
    css.textContent = main[0][1];

    this._template.content.appendChild(css);
  }

  _buildDivEffect() {
    if (this._effect) {
      const div = document.createElement("div");
      div.classList.add("effect");
      div.classList.add(this._effect);

      this._figure.appendChild(div);
    }
  }

  _onImageOriginalLoaded(ev) {
    if (this._placeholder) {
      this._image_placeholder.addEventListener("transitionend", ({ target }) =>
        target.remove()
      );
      this._image_placeholder.classList.add("fade-out");
    }
  }
}

window.customElements.define("v-image", VImage);

console.log(main);
