import { LitElement, html, css } from 'lit-element';

import './AppPage.js';

class AskChecks extends LitElement {
  static get properties() {
    return {
      checkedItems: { type: Array, attribute: false },
      items: { type: Array },
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

      label {
        display: block;
      }
    `;
  }

  constructor() {
    super();

    this.checkedItems = [];
    this.hasValidated = false;
  }

  change(newValue) {
    if (newValue) {
      this.currentValue = Number(newValue);
    }
  }

  toggleItem(e) {
    let foundItem = false;
    const item = e.target.value;

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

  validate() {
    this.hasValidated = true;
    this.valid = this.checkedItems.length === 0;
  }

  render() {
    return html`
      <app-page>
        <h1><slot></slot></h1>

        ${this.items.map(item => {
          return html`
            <label>
              <input
                type="checkbox"
                @input="${this.toggleItem}"
                .value="${item}"
              />
              <span>${item}</span>
            </label>
          `;
        })}

        <button @click="${this.validate}">Save</button>

        <div class="alert" ?hidden="${!this.hasValidated}">
          <slot name="failure" ?hidden="${this.valid}"></slot>
          <slot name="success" ?hidden="${!this.valid}"></slot>
        </div>
      </app-page>
    `;
  }
}

customElements.define('ask-checks', AskChecks);
