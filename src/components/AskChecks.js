import { LitElement, html, css } from 'lit-element';

import { button, h1, label, visuallyHidden } from '../reset.js';

import './AppAlert.js';
import './AppSave.js';

class AskChecks extends LitElement {
  static get properties() {
    return {
      checkedItems: { type: Array, attribute: false },
      failure: { type: String },
      hasValidated: { type: Boolean, attribute: false },
      items: { type: Array },
      key: { type: String },
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

      ${label}

      label {
        align-items: center;
        display: flex;
      }

      ${button}

      ${visuallyHidden}

      .checkbox {
        flex: none;
        margin-right: 0.25em;
        width: 1.5em;
      }

      .checkbox--checked {
        opacity: 1;
      }

      .checkbox--unchecked {
        opacity: 0.2;
      }

      label:hover .checkbox--unchecked,
      label:focus .checkbox--unchecked {
        opacity: 0.3;
      }
    `;
  }

  get id() {
    return (
      this.getAttribute('id') || `askchecks_${Math.floor(Math.random() * 1000)}`
    );
  }

  constructor() {
    super();

    this.checkedItems = [];
    this.hasValidated = false;
  }

  update(changedProperties) {
    if (changedProperties.has('key')) {
      this.checkedItems = [];
      this.hasValidated = false;
      this.valid = null;
    }

    super.update(changedProperties);
  }

  toggleItem(item) {
    let foundItem = false;
    this.hasValidated = false;

    if (item) {
      const newCheckedItems = this.checkedItems.reduce((items, checkedItem) => {
        if (checkedItem === item) {
          foundItem = true;
        } else {
          items.push(checkedItem);
        }

        return items;
      }, []);

      if (!foundItem) {
        newCheckedItems.push(item);
      }

      this.checkedItems = newCheckedItems;
    }
  }

  validate(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.hasValidated = true;
    this.valid = this.checkedItems.length === 0;

    const saveEvent = new CustomEvent('save', {
      detail: {
        checkedItems: this.checkedItems,
      },
    });

    this.dispatchEvent(saveEvent);
  }

  render() {
    return html`
      <h1><slot></slot></h1>

      <form method="POST" action="" @submit="${this.validate}">
        ${this.items.map((item, index) => {
          return html`
            <label
              tabindex="0"
              @keyup="${e => {
                if (e.which === 13) {
                  e.preventDefault();
                  this.toggleItem(item);
                }
              }}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="checkbox ${this.checkedItems.includes(item)
                  ? 'checkbox--checked'
                  : 'checkbox--unchecked'}"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>${item}</span>
              <input
                class="hidden"
                id="${this.id}_${index}"
                name="${this.id}"
                tabindex="-1"
                type="checkbox"
                @input="${e => {
                  e.preventDefault();
                  this.toggleItem(item);
                }}"
                ?checked="${this.checkedItems.includes(item)}"
                .value="${item}"
              />
            </label>
          `;
        })}

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

customElements.define('ask-checks', AskChecks);
