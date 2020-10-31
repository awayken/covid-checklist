import { argsToAttributes } from './helper.js';

import '../components/AppSave.js';

export default {
  title: 'App Components/AppSave',
  component: 'app-save',
};

const Template = args => `<app-save ${argsToAttributes(args)}></app-save>`;

export const renders = Template.bind({});

export const rendersInsideAButton = () =>
  `<button><app-save></app-save></button>`;
