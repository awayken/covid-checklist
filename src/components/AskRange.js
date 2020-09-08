import { LitElement, html, css } from 'lit-element';

import { h1, input } from '../reset.js';

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

      ${h1}

      ${input}
    `;
  }

  get id() {
    return (
      this.getAttribute('id') || `askrange_${Math.floor(Math.random() * 1000)}`
    );
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
      <form method="POST" action="" @submit="${this.validate}">
        <h1>
          <label for="${this.id}_input">
            <slot></slot>
          </label>
        </h1>

        <button type="button" @click="${this.decrease}" title="Decrease">
          -
        </button>
        <input
          autocomplete="off"
          id="${this.id}_input"
          required
          step="0.1"
          type="number"
          @change="${e => {
            this.change(e.currentTarget.value);
          }}"
          @input="${e => {
            this.change(e.currentTarget.value);
          }}"
          .value="${this.currentValue.toString()}"
        />
        <button type="button" @click="${this.increase}" title="Increase">
          +
        </button>

        <button type="submit">Save</button>
      </form>

      <app-alert
        level="${this.valid ? 'success' : 'failure'}"
        ?hide="${!this.hasValidated}"
      >
        ${this.failure}
      </app-alert>
    `;
  }
}

customElements.define('ask-range', AskRange);
