import { LitElement, html, css } from 'lit-element';

import './AppIcon.js';

class AppSave extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      :host[hidden] {
        display: none;
      }

      .appsave {
        align-items: center;
        display: flex;
      }

      app-icon {
        --icon-width: 1em;
        margin-left: 0.25em;
      }
    `;
  }

  render() {
    return html`
      <span class="appsave">
        <span>Next</span>

        <app-icon name="arrow-circle-right"></app-icon>
      </span>
    `;
  }
}

customElements.define('app-save', AppSave);
