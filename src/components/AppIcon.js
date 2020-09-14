import { LitElement, html, css } from 'lit-element';

class AppIcon extends LitElement {
  static get properties() {
    return {
      name: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        align-items: center;
        display: flex;
      }

      :host[hidden] {
        display: none;
      }

      svg {
        display: inline-block;
        width: var(--icon-width, 1em);
      }
    `;
  }

  static get icons() {
    return {
      'arrow-circle-down':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z',
      'arrow-circle-left':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z',
      'arrow-circle-right':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z',
      'arrow-circle-up':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z',
      'check-circle':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
      'minus-circle':
        'M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z',
      'plus-circle':
        'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z',
    };
  }

  render() {
    const iconPath = AppIcon.icons[this.name];

    if (!iconPath) {
      return null;
    }

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="${iconPath}" clip-rule="evenodd" />
      </svg>
    `;
  }
}

customElements.define('app-icon', AppIcon);
