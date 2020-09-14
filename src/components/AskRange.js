import { LitElement, html, css } from 'lit-element';

import { button, input } from '../reset.js';

import './AppAlert.js';
import './AppHeading.js';
import './AppIcon.js';
import './AppSave.js';

class AskRange extends LitElement {
  static get properties() {
    return {
      currentValue: { type: Number, attribute: false },
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

      app-icon {
        --icon-width: 1.25em;
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
        <app-heading icon="${this.hasValidated ? 'check' : ''}">
          <label for="${this.id}_input">
            <slot></slot>
          </label>
        </app-heading>

        <div class="range">
          <button type="button" @click="${this.decrease}" title="Decrease">
            <app-icon name="minus-circle"></app-icon>
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
            <app-icon name="plus-circle"></app-icon>
          </button>
        </div>

        <button type="submit">
          <app-save></app-save>
        </button>
      </form>
    `;
  }
}

customElements.define('ask-range', AskRange);
