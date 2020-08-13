import { LitElement, html, css } from 'lit-element';

import './AppPage.js';

class AskRange extends LitElement {
  static get properties() {
    return {
      currentValue: { type: Number, attribute: false },
      initial: { type: Number },
      max: { type: Number },
    };
  }

    static get styles() {
      return css`
        :host {
          display: block;
        }

        :host[hidden],
        [hidden] {
          display: none;
        }
      `;
    }

  constructor() {
    super();

    this.initial = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    this.change(this.initial);
  }

  change(newValue) {
    if (newValue) {
      this.currentValue = Number(newValue);
    }
  }

  _increase() {
    this.change(this.currentValue + 0.1);
  }

  _decrease() {
    this.change(this.currentValue - 0.1);
  }

  render() {
    let hideError = true;

    if (this.currentValue > this.max) {
      hideError = false;
    }

    return html`
      <app-page>
        <h1><slot></slot></h1>

        <button @click="${this._decrease}">-</button>
        <input type="number" @input="${e => { this.change(e.currentTarget.value); }}" .value="${this.currentValue}" />
        <button @click="${this._increase}">+</button>

        <div class="alert" ?hidden="${hideError}">
          <p>${this.max} is the maximum.</p>
          <slot name="error"></slot>
        </div>
      </app-page>
    `;
  }
}

customElements.define('ask-range', AskRange);
