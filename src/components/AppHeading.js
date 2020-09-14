import { LitElement, html, css } from 'lit-element';

import './AppIcon.js';

class AppHeading extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host[hidden] {
        display: none;
      }

      h1 {
        display: flex;
        font-family: var(--headline-family);
        font-size: var(--headline-size);
        font-weight: var(--headline-weight);
        line-height: 1.3;
        margin: 0 0 0.5rem 0;
        padding: 0;
      }

      app-icon {
        --icon-width: 1.25em;
        margin-right: 0.25em;
      }
    `;
  }

  render() {
    const checkmark = this.icon
      ? html`<app-icon name="${this.icon}"></app-icon>`
      : null;

    return html`
      <h1>
        ${checkmark}

        <slot></slot>
      </h1>
    `;
  }
}

customElements.define('app-heading', AppHeading);
