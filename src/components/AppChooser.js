import { LitElement, html, css } from 'lit-element';

import { input } from '../reset.js';

class AppChooser extends LitElement {
  static get properties() {
    return {
      choices: { type: Array, hasAttribute: false },
      label: { type: String },
      list: { type: String },
      value: { type: String },
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

      ${input}

      input {
        margin-bottom: 4px;
        width: 100%;
      }

      .label {
        display: block;
        line-height: 2;
      }

      .persons {
        align-items: top;
        display: flex;
        overflow: auto;
        padding: 6px;
      }

      .person {
        align-items: center;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: var(--color-background, #ffdcf4);
        border: var(--border-default, 2px solid currentColor);
        border-radius: var(--border-radius, 10px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        display: flex;
        flex: 1 1 100%;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 4px;
        max-width: 200px;
        min-width: 100px;
        padding: 2px 6px;
        width: 27%;
      }

      .person:focus {
        outline: var(--outline, 2px solid var(--primary-color, yellow));
      }

      .person[selected] {
        border: var(--border-selected, 2px solid var(--primary-color, yellow));
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
      }

      .person__detail {
        display: block;
      }

      .person__avatar {
        font-size: 2em;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.getChoicesFromList();
  }

  adoptedCallback() {
    super.adoptedCallback();

    this.getChoicesFromList();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.choicesLoop) {
      window.cancelAnimationFrame(this.choicesLoop);
    }
  }

  getChoicesFromList() {
    const list = this.parentElement.querySelector(`#${this.list}`);
    const choices = [];

    if (list) {
      const options = list.querySelectorAll('option');
      for (const option of options) {
        const value = option.getAttribute('value');

        if (value && value.length) {
          choices.push(value);
        }
      }
    }

    this.choices = choices;

    this.choicesLoop = window.requestAnimationFrame(() =>
      this.getChoicesFromList()
    );
  }

  handleAdd() {
    const newPerson = this.renderRoot.querySelector('[name="person_new"]');

    if (newPerson && newPerson.value) {
      const addEvent = new CustomEvent('choose', {
        detail: {
          value: newPerson.value,
        },
      });

      this.dispatchEvent(addEvent);

      newPerson.value = '';
    }
  }

  handleChoice(value) {
    const chooseEvent = new CustomEvent('choose', {
      detail: {
        value,
      },
    });

    this.dispatchEvent(chooseEvent);
  }

  render() {
    return html`
      <label class="label" for="checklist_person">${this.label}</label>

      <div class="persons" id="checklist_person">
        ${this.choices.map(
          choice => html`
            <button
              class="person"
              type="button"
              title="${choice}"
              ?selected="${choice === this.value}"
              .value="${choice}"
              @click="${() => this.handleChoice(choice)}"
            >
              <span class="person__detail person__avatar"
                >${choice[0].toUpperCase()}</span
              >
              <span class="person__detail">${choice}</span>
            </button>
          `
        )}

        <span class="person">
          <span class="person__detail person__avatar">+</span>
          <input type="text" name="person_new" />
          <button class="person__detail" @click="${this.handleAdd}">
            Add a Person
          </button>
        </span>
      </div>
    `;
  }
}

customElements.define('app-chooser', AppChooser);
