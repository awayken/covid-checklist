import { argsToAttributes } from './helper.js';

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
          summary: 'info',
        },
      },
    },
    hide: {
      description: 'Hides the element',
      control: 'boolean',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
};

const Template = args =>
  `<app-alert ${argsToAttributes(args)}
    >This is an alert.</app-alert
  >`;

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  level: 'info',
  hide: false,
};

export const StyledInfoAlert = Template.bind({});
StyledInfoAlert.args = {
  ...InfoAlert.args,
  style: '--info-color: navy; --background-color: lightblue;',
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  level: 'success',
};

export const StyledSuccessAlert = Template.bind({});
StyledSuccessAlert.args = {
  ...SuccessAlert.args,
  style: '--success-color: darkgreen; --background-color: palegreen;',
};

export const FailureAlert = Template.bind({});
FailureAlert.args = {
  level: 'failure',
};

export const StyledFailureAlert = Template.bind({});
StyledFailureAlert.args = {
  ...FailureAlert.args,
  style: '--failure-color: darkred; --background-color: lightcoral;',
};

export const HiddenAlert = Template.bind({});
HiddenAlert.args = {
  hide: true,
};

export const StyledCustomAlert = Template.bind({});
StyledCustomAlert.args = {
  level: 'ludicrious',
  style: '--primary-color: gold; --background-color: black;',
};
