import { LitElement, html, css } from 'lit-element';

import { button, h1, input } from '../reset.js';

import './AppAlert.js';
import './AppSave.js';

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

      ${button}

      .range {
        display: flex;
        justify-content: space-between;
      }

      .range > * + * {
        margin-left: 0.25em;
      }

      .range button {
        align-items: center;
        display: grid;
        justify-content: center;
      }

      .range input {
        flex: auto;
      }

      svg {
        width: 1.25em;
      }
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

        <div class="range">
          <button type="button" @click="${this.decrease}" title="Decrease">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <button type="submit">
          <app-save></app-save>
        </button>
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
