import { LitElement, html, css } from 'lit-element';

import './AppPage.js';
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
        align-items: stretch;
        display: flex;
        flex-grow: 1;
        justify-content: stretch;
        max-width: 100%;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

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

    const name = this.name || 'Your child';

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
        />

        <datalist id="checklist_people">
          ${personOptions}
        </datalist>

        <div class="pages">
        <app-page>
          <ask-range
            data-ask
            failure="Do not send ${name} to school or work with a fever of 100.4° or higher."
            id="temperature"
            initial="98.6"
            max="100.4"
          >
            ${name}'s temperature
          </ask-range>
          </app-page>

          <app-page>
          <ask-checks
            data-ask
            id="symptomsnew"
            items="${JSON.stringify([
              'Sore throat',
              'New uncontrolled cough that causes difficulty breathing',
              'Diarrhea, vomiting, or abdominal pain',
              'New onset of severe headache, especially with a fever',
            ])}"
            failure="Do not send ${name} to school or work. Contact your healthcare provider and school or work to inform them of ${name}’s symptoms."
          >
            ${name}'s symptoms
          </ask-checks>
          </app-page>

          <app-page>
          <ask-checks
            data-ask
            id="covidcontact"
            items="${JSON.stringify([
              'Have they been identified as having COVID-19 and not been cleared by the SD Deptartment of Health for return to school or work?',
              'Have they been identified as a close contact (spending 15 minutes or more within 6 feet or fewer) to a confirmed COVID-19 case within the last 14 days?',
            ])}"
            failure="Do not send ${name} to school or work. Contact your healthcare provider."
          >
            ${name}'s COVID-19 contact
          </ask-checks>
          </app-page>

          ${
            this.isComplete
              ? html`
                  <app-page>
                    <h1>Almost Done</h1>
                    <p>
                      Double check the checklist and save today's details
                      when you're ready.
                    </p>
                    <button @click="${this.completeChecklist}">
                      Save Today
                    </button>
                  </app-page>
                `
              : ''
          }
        </div>
      </main>
    `;
  }
}

customElements.define('app-checklist', AppChecklist);
