import { LitElement, html, css } from 'lit-element';

import { button, input, label, p } from '../reset.js';

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
        transition: opacity 300ms ease-out, translate 400ms ease-in-out;
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
  }

  scrollToPage(pageNumber) {
    const pages = this.renderRoot.querySelectorAll('app-page');
    const newPage = pages[pageNumber];

    if (newPage) {
      if (pageNumber > 0) {
        window.setTimeout(() => {
          newPage.scrollIntoView({
            behavior: 'smooth',
          });
        }, 200);
      } else {
        newPage.scrollIntoView();
      }
    }
  }

  renderAlert() {
    if (
      !(this.isComplete && (this.isValid === true || this.isValid === false))
    ) {
      return null;
    }

    const failedAsks = {};
    const asks = this.renderRoot.querySelectorAll('[data-ask]');

    for (const ask of asks) {
      const askId = ask.getAttribute('id');
      failedAsks[askId] = !(ask.valid || false);
    }

    const alertTemperature = failedAsks.temperature
      ? html`<li>
          ${this.previousName} cannot have a fever of 100.4° or higher.
        </li>`
      : '';
    const alertSymptoms = failedAsks.symptomsnew
      ? html`<li>
          Inform school or work of ${this.previousName}'s symptoms. You may also
          contact the SD Department of Health with any COVID-19 questions at
          <a href="tel:18009972880">1-800-997-2880</a>.
        </li>`
      : '';
    const alertCOVID = failedAsks.covidcontact
      ? html`<li>
          Quarantine ${this.previousName} until a negative COVID test. If
          untested, quarantine ${this.previousName} at least 10 days since
          onset, and symptoms have improved, and it's been 24 hours without
          fever.
        </li>`
      : '';

    return html`
      <app-alert level="${this.isValid ? 'success' : 'failure'}">
        <p>
          Do not send ${this.previousName} to school or work, and contact
          ${this.previousName}'s healthcare provider.
        </p>
        <ul>
          ${alertTemperature} ${alertSymptoms} ${alertCOVID}
        </ul>
      </app-alert>
    `;
  }

  render() {
    const personOptions = getPersons().map(
      person => html` <option value="${person}"></option> `
    );

    const showPages = this.name && this.name.length > 0;

    const alert = this.renderAlert();

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

        ${alert}

        <div class="pages ${showPages ? 'pages--show' : 'pages--hide'}">
          <app-page>
            <ask-range
              data-ask
              id="temperature"
              initial="98.6"
              key="${this.name}"
              max="100.4"
              @save="${e => {
                this.saveAsk(e);
                this.scrollToPage(1);
              }}"
            >
              ${this.name}'s temperature
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
              key="${this.name}"
              @save="${e => {
                this.saveAsk(e);
                this.scrollToPage(2);
              }}"
            >
              ${this.name}'s symptoms
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
              key="${this.name}"
              @save="${e => {
                this.saveAsk(e);
                this.scrollToPage(3);
              }}"
            >
              ${this.name}'s COVID-19 contact
            </ask-checks>
          </app-page>

          <app-page>
            <app-heading>
              ${this.isComplete
                ? 'Almost Done'
                : 'Complete The Checklist First'}
            </app-heading>

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
      </main>
    `;
  }
}

customElements.define('app-checklist', AppChecklist);
