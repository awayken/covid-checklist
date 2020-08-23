import { LitElement, html, css } from 'lit-element';

import './AskRange.js';
import './AskChecks.js';

import { getPersons, saveCheck } from '../storage.js';

class AppChecklist extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      isComplete: { type: Boolean },
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

  connectedCallback() {
    super.connectedCallback();

    this.name = this.name || 'Your Child';
    this.isComplete = true;
  }

  completeChecklist() {
    const asks = this.renderRoot.querySelectorAll('[data-ask]');
    const checkData = {};

    for (const ask of asks) {
      const askId = ask.getAttribute('id');
      const validity = ask.valid || false;

      checkData[askId] = validity;
    }

    saveCheck(this.name, checkData);
  }

  render() {
    let heading = 'COVID Checklist';

    if (this.name) {
      heading += ` for ${this.name}`;
    }

    const personOptions = getPersons().map(
      person => html` <option value="${person}"></option> `
    );

    return html`
      <main>
        <h1>${heading}</h1>

        <label for="checklist_person">Who are you checking?</label>
        <input
          list="checklist_people"
          id="checklist_person"
          name="checklist_person"
          @input="${e => {
            this.name = e.target.value;
          }}"
          @blur="${e => {
            // save this to the list of people in storage
          }}"
        />

        <datalist id="checklist_people">
          ${personOptions}
        </datalist>

        <div class="pages">
          <ask-range
            data-ask
            failure="Do not send your child to school with a fever of 100.4° or higher."
            id="temperature"
            initial="98.6"
            max="100.4"
            name="${this.name}"
          >
            What is your child's temperature?
          </ask-range>

          <ask-checks
            data-ask
            id="covidcontact"
            items="${JSON.stringify([
              'Has your child had close contact with such a person in the past 14 days?',
            ])}"
            failure="Do not send your child to school. Contact your healthcare provider."
            name="${this.name}"
          >
            Confirmed Cases of COVID-19
          </ask-checks>

          <ask-checks
            data-ask
            id="symptomsnew"
            items="${JSON.stringify(['Chills', 'Diarrhea', 'Sore throat'])}"
            failure="Do not send your child to school. Contact your healthcare provider. Contact your school to inform them of your child’s symptoms."
            name="${this.name}"
          >
            Does your child have any of these symptoms?
          </ask-checks>

          <ask-checks
            data-ask
            id="symptomsworse"
            items="${JSON.stringify([
              'Shortness of breath',
              'Cough',
              'Muscle pain',
              'Headache',
              'Loss of taste or smell',
            ])}"
            failure="Do not send your child to school. Contact your healthcare provider. Contact your school to inform them of your child’s symptoms."
            name="${this.name}"
          >
            Are any of these symptoms new or worsening in your child?
          </ask-checks>

          ${this.isComplete
            ? html`<button @click="${this.completeChecklist}">
                Save Today
              </button>`
            : ''}
        </div>
      </main>
    `;
  }
}

customElements.define('app-checklist', AppChecklist);
