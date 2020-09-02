import { LitElement, html, css } from 'lit-element';

class AppAlert extends LitElement {
  static get properties() {
    return {
      level: { type: String },
      hide: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        --info-color: blue;
        --success-color: green;
        --failure-color: red;

        --background-color: white;
        --primary-color: var(--info-color);

        display: block;
      }

      :host[hidden],
      [hidden] {
        display: none;
      }

      aside {
        background: var(--background-color);
        border: 2px solid var(--primary-color);
        border-radius: 4px;
        color: var(--primary-color);
        margin: 0.5em auto;
        padding: 0.5em;
      }

      .success {
        --primary-color: var(--success-color);
      }

      .failure {
        --primary-color: var(--failure-color);
      }
    `;
  }

  getMessage() {
    if (this.level === 'success') {
      return '😀 All good!';
    }

    return html`<slot></slot>`;
  }

  render() {
    return html`
      <aside class="${this.level}" ?hidden="${this.hide}">
        ${this.getMessage()}
      </aside>
    `;
  }
}

customElements.define('app-alert', AppAlert);
