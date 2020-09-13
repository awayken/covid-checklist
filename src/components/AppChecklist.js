import { LitElement, html, css } from 'lit-element';

import { button, h1, input, label, p } from '../reset.js';

import './AppAlert.js';
import './AppPage.js';
import './AskRange.js';
import './AskChecks.js';

import { getPersons, saveCheck } from '../storage.js';

class AppChecklist extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      isComplete: { type: Boolean, attribute: false },
      isValid: { type: Boolean },
      pageNumber: { type: Number, attribute: false },
      previousName: { type: String, attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        --headline-size: 1.5rem;
      }

      ${h1}

      main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin: 0 auto;
        max-width: 960px;
        width: 100%;
      }

      ${label}

      ${input}

      input {
        width: 100%;
      }

      ${button}

      ${p}

      .pages {
        align-items: stretch;
        display: flex;
        flex-grow: 1;
        justify-content: stretch;
        max-width: 100%;
        overflow-x: scroll;
        padding: 1em 0;
        scroll-snap-type: x mandatory;
        transition: opacity 300ms ease-out;
      }

      .pages--hide {
        opacity: 0;
      }

      .pages--show {
        opacity: 1;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.completedAsks = new Set();
    this.isComplete = false;
    this.isValid = null;
    this.pageNumber = 0;
  }

  choosePerson(name) {
    this.name = name;
    this.previousName = name;

    this.isComplete = false;
    this.isValid = null;
    this.completedAsks = new Set();

    this.scrollToPage(0);
  }

  saveAsk(e) {
    const asks = this.renderRoot.querySelectorAll('[data-ask]');

    this.completedAsks.add(e.target);
    this.isComplete = this.completedAsks.size === asks.length;

    this.scrollToPage(this.pageNumber + 1);
  }

  completeChecklist() {
    const checkData = {};
    const asks = this.renderRoot.querySelectorAll('[data-ask]');

    let totalValidity = true;

    for (const ask of asks) {
      const askId = ask.getAttribute('id');
      const validity = ask.valid || false;

      totalValidity = totalValidity && validity;

      checkData[askId] = validity;
    }

    saveCheck(this.name, checkData);

    this.isValid = totalValidity;
    this.name = null;

    const checklistPerson = this.renderRoot.querySelector('#checklist_person');
    if (checklistPerson) {
      checklistPerson.focus();
    }
  }

  scrollToPage(pageNumber) {
    const pages = this.renderRoot.querySelector('.pages');
    const rect = pages.getBoundingClientRect();

    pages.scrollLeft = pageNumber * rect.width;

    this.pageNumber = pageNumber;
  }

  render() {
    const personOptions = getPersons().map(
      person => html` <option value="${person}"></option> `
    );

    const showPages = this.name && this.name.length > 0;

    return html`
      <main>
        <slot></slot>

        <form
          method="POST"
          action=""
          @submit="${e => {
            e.preventDefault();
          }}"
        >
          <label for="checklist_person">Who are you checking?</label>
          <input
            autocomplete="name"
            autofocus
            id="checklist_person"
            list="checklist_people"
            name="checklist_person"
            placeholder="Type or choose a name"
            @input="${e => {
              this.choosePerson(e.target.value);
            }}"
            .value="${this.name || ''}"
          />

          <datalist id="checklist_people">
            ${personOptions}
          </datalist>
        </form>

        <div class="pages ${showPages ? 'pages--show' : 'pages--hide'}">
          <app-page>
            <ask-range
              data-ask
              failure="Do not send ${this
                .name} to school or work with a fever of 100.4° or higher."
              id="temperature"
              initial="98.6"
              key="${this.name}"
              max="100.4"
              @save="${this.saveAsk}"
            >
              ${this.name}'s temperature
            </ask-range>
          </app-page>

          <app-page>
            <ask-checks
              data-ask
              failure="Do not send ${this
                .name} to school or work. Contact your healthcare provider and school or work to inform them of ${this
                .name}’s symptoms."
              id="symptomsnew"
              items="${JSON.stringify([
                'Sore throat',
                'New uncontrolled cough that causes difficulty breathing',
                'Diarrhea, vomiting, or abdominal pain',
                'New onset of severe headache, especially with a fever',
              ])}"
              key="${this.name}"
              @save="${this.saveAsk}"
            >
              ${this.name}'s symptoms
            </ask-checks>
          </app-page>

          <app-page>
            <ask-checks
              data-ask
              failure="Do not send ${this
                .name} to school or work. Contact your healthcare provider."
              id="covidcontact"
              items="${JSON.stringify([
                'Have they been identified as having COVID-19 and not been cleared by the SD Deptartment of Health for return to school or work?',
                'Have they been identified as a close contact (spending 15 minutes or more within 6 feet or fewer) to a confirmed COVID-19 case within the last 14 days?',
              ])}"
              key="${this.name}"
              @save="${this.saveAsk}"
            >
              ${this.name}'s COVID-19 contact
            </ask-checks>
          </app-page>

          <app-page>
            <h1>
              ${this.isComplete
                ? 'Almost Done'
                : 'Complete The Checklist First'}
            </h1>
            <p>
              Double check the checklist and save today's details when you're
              ready.
            </p>
            <button
              @click="${this.completeChecklist}"
              .disabled="${!this.isComplete}"
            >
              Save Today
            </button>
          </app-page>
        </div>

        <app-alert
          level="${this.isValid ? 'success' : 'failure'}"
          ?hide="${!(
            this.isComplete &&
            (this.isValid === true || this.isValid === false)
          )}"
        >
          Do not send ${this.previousName} to school or work. Contact your
          healthcare provider and school or work to inform them of
          ${this.previousName}’s symptoms.
        </app-alert>
      </main>
    `;
  }
}

customElements.define('app-checklist', AppChecklist);
