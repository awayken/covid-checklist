import { LitElement, html, css } from 'lit-element';

import './AppAlert.js';

class AskRange extends LitElement {
  static get properties() {
    return {
      currentValue: { type: Number, attribute: false },
      failure: { type: String },
      hasValidated: { type: Boolean, attribute: false },
      initial: { type: Number },
      key: { type: String },
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

  update(changedProperties) {
    if (changedProperties.has('key')) {
      this.currentValue = Number(this.initial);
      this.hasValidated = false;
      this.valid = null;
    }

    super.update(changedProperties);
  }

  connectedCallback() {
    super.connectedCallback();

    this.change(this.initial);
  }

  change(newValue) {
    if (newValue) {
      this.hasValidated = false;
      this.currentValue = Number(newValue);
    }
  }

  increase() {
    this.change((this.currentValue + 0.1).toFixed(1));
  }

  decrease() {
    this.change((this.currentValue - 0.1).toFixed(1));
  }

  validate(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.hasValidated = true;
    this.valid = this.currentValue < this.max;

    const saveEvent = new CustomEvent('save', {
      detail: {
        value: this.currentValue,
      },
    });

    this.dispatchEvent(saveEvent);
  }

  render() {
    return html`
      <h1><slot></slot></h1>

      <form method="POST" action="" @submit="${this.validate}">
        <button type="button" @click="${this.decrease}">-</button>
        <input
          type="number"
          step="0.1"
          @input="${e => {
            this.change(e.currentTarget.value);
          }}"
          @change="${e => {
            this.change(e.currentTarget.value);
          }}"
          required
          .value="${this.currentValue.toString()}"
        />
        <button type="button" @click="${this.increase}">+</button>

        <button type="submit">Save</button>
      </form>

      <app-alert
        ?hide="${!this.hasValidated}"
        level="${this.valid ? 'success' : 'failure'}"
      >
        ${this.failure}
      </app-alert>
    `;
  }
}

customElements.define('ask-range', AskRange);
