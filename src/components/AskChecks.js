import { LitElement, html, css } from 'lit-element';

import './AppAlert.js';
import './AppPage.js';

class AskChecks extends LitElement {
  static get properties() {
    return {
      checkedItems: { type: Array, attribute: false },
      failure: { type: String },
      hasValidated: { type: Boolean, attribute: false },
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

    this.hasValidated = false;
    this.checkedItems = newCheckedItems;
  }

  validate(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.hasValidated = true;
    this.valid = this.checkedItems.length === 0;
  }

  render() {
    return html`
      <app-page>
        <h1><slot></slot></h1>

        <form method="post" action="" @submit="${this.validate}">
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

          <button type="submit">Save</button>
        </form>

        <app-alert
          ?hide="${!this.hasValidated}"
          level="${this.valid ? 'success' : 'failure'}"
        >
          ${this.failure}
        </app-alert>
      </app-page>
    `;
  }
}

customElements.define('ask-checks', AskChecks);
