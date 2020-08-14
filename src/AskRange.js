import { LitElement, html, css } from 'lit-element';

import './AppPage.js';

class AskRange extends LitElement {
  static get properties() {
    return {
      currentValue: { type: Number, attribute: false },
      initial: { type: Number },
      max: { type: Number },
      valid: { type: Boolean },
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
    this.hasValidated = false;
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

  validate() {
    this.hasValidated = true;
    this.valid = this.currentValue < this.max;
  }

  render() {
    return html`
      <app-page>
        <h1><slot></slot></h1>

        <button @click="${this._decrease}">-</button>
        <input
          type="number"
          @input="${e => {
            this.change(e.currentTarget.value);
          }}"
          .value="${this.currentValue}"
        />
        <button @click="${this._increase}">+</button>

        <button @click="${this.validate}">Save</button>

        <div class="alert" ?hidden="${!this.hasValidated}">
          <slot name="failure" ?hidden="${this.valid}"></slot>
          <slot name="success" ?hidden="${!this.valid}"></slot>
        </div>
      </app-page>
    `;
  }
}

customElements.define('ask-range', AskRange);
