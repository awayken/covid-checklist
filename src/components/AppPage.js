import { LitElement, html, css } from 'lit-element';

class AppPage extends LitElement {
  static get styles() {
    return css`
      *,
      :host {
        box-sizing: border-box;
      }

      :host {
        align-items: stretch;
        display: flex;
        flex: 1 0 100%;
        height: 100%;
        justify-content: stretch;
        padding: 0 .25rem;
        scroll-snap-align: center;
        width: 100%;
      }

      section {
        border-top: .5rem solid var(--complementary-color);
        flex-grow: 1;
        padding: 1em 0;
      }
    `;
  }

  render() {
    return html`
      <section tabindex="0">
        <slot></slot>

        <slot name="footer"></slot>
      </section>
    `;
  }
}

customElements.define('app-page', AppPage);
