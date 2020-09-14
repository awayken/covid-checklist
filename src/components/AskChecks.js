import { LitElement, html, css } from 'lit-element';

import { button, label, visuallyHidden } from '../reset.js';

import './AppAlert.js';
import './AppHeading.js';
import './AppIcon.js';
import './AppSave.js';

class AskChecks extends LitElement {
  static get properties() {
    return {
      checkedItems: { type: Array, attribute: false },
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

      ${label}

      label {
        align-items: center;
        display: flex;
      }

      ${button}

      ${visuallyHidden}

      .checkbox {
        --icon-width: 1.5em;
        flex: none;
        margin-right: 0.25em;
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
      <app-heading icon="${this.hasValidated ? 'check' : ''}">
        <slot></slot>
        </app-heading>

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
                <app-icon
                  aria-hidden="true"
                  class="checkbox ${this.checkedItems.includes(item)
                    ? 'checkbox--checked'
                    : 'checkbox--unchecked'}"
                  name="check-circle"
                ></app-icon>

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
      </app-heading>
    `;
  }
}

customElements.define('ask-checks', AskChecks);
