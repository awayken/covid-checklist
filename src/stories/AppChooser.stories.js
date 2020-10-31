import { argsToAttributes } from './helper.js';

import '../components/AppChooser.js';

export default {
  title: 'App Components/AppChooser',
  component: 'app-chooser',
  args: {
    list: 'choices',
  },
  argTypes: {
    list: {
      description: 'Datalist containing the choices',
    },
  },
};

const Template = args =>
  `<app-chooser ${argsToAttributes(args)}
    ></app-chooser
  >
  <datalist id="choices">
    <option value="Miles Rausch"></option>
    <option value="Riles Mausch"></option>
    <option value="Brank"></option>
    <option value=""></option>
    <option value="Crank"></option>
    <option value="Zeezee Topical Cream"></option>
  </datalist>
  `;

export const Default = Template.bind({});
Default.args = {
  label: 'Who are you checking?',
};

export const Chosen = Template.bind({});
Chosen.args = {
  label: 'Who are you checking?',
  value: 'Brank',
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'Who are you checking?',
  list: null,
};
