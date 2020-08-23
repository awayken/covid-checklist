import { LitElement, html, css } from 'lit-element';

class AppPage extends LitElement {
  static get styles() {
    return css`
      :host {
        align-items: stretch;
        box-sizing: border-box;
        display: flex;
        flex: 1 0 100%;
        height: 100%;
        justify-content: stretch;
        padding: 1em;
        width: 100%;
      }

      section {
        border: 1px solid rgba(0, 0, 0, 0.7);
        border-radius: 0.35em;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
        flex-grow: 1;
        padding: 1em;
      }
    `;
  }

  render() {
    return html`
      <section>
        <slot></slot>

        <slot name="footer"></slot>
      </section>
    `;
  }
}

customElements.define('app-page', AppPage);
