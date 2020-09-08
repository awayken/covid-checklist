import { LitElement, html, css } from 'lit-element';

class AppSave extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      :host[hidden],
      [hidden] {
        display: none;
      }

      .appsave {
        align-items: center;
        display: flex;
      }

      .appsave > * + * {
        margin-left: 0.25em;
      }

      svg {
        width: 1em;
      }
    `;
  }

  render() {
    return html`
      <span class="appsave">
        <span>Save</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    `;
  }
}

customElements.define('app-save', AppSave);
