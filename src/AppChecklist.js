import { LitElement, html, css } from 'lit-element';

class AppChecklist extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }

      main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 960px;
        width: 100%;
      }

      .pages {
        display: flex;
        flex-grow: 1;
        max-width: 100%;
        overflow-x: auto;
      }
    `;
  }

  render() {
    return html`
      <main>
        <h1>COVID Checklist</h1>
        <slot class="pages"></slot>
      </main>
    `;
  }
}

customElements.define('app-checklist', AppChecklist);
