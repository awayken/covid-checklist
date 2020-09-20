import { html } from 'lit-html';

import '../components/AppAlert.js';

export default {
  title: 'App Components/AppAlert',
  component: 'app-alert',
  args: {
    level: 'info',
    hide: false,
  },
  argTypes: {
    level: {
      description: 'Level of severity of the alert',
      control: {
        type: 'select',
        options: ['info', 'success', 'failure'],
      },
      table: {
        defaultValue: {
          summary: 'info'
        }
      }
    },
    hide: {
      description: 'Hides the element',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false
        },
      }
    },
  },
};

const Template = args => html`<app-alert level="${args.level}" ?hide="${args.hide}">This is an alert.</app-alert>`;

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  level: 'info',
  hide: false,
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  level: 'success',
};

export const FailureAlert = Template.bind({});
FailureAlert.args = {
  level: 'failure',
};

export const HiddenAlert = Template.bind({});
HiddenAlert.args = {
  hide: true,
};
