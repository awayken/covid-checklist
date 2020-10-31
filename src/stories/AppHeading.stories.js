import { argsToAttributes } from './helper.js';

import '../components/AppHeading.js';

export default {
  title: 'App Components/AppHeading',
  component: 'app-heading',
  argTypes: {
    icon: {
      description: 'Name of the icon to display before the heading',
      control: { type: 'text' },
    },
  },
};

const Template = args =>
  `<app-heading ${argsToAttributes(args)}>Welcome!</app-heading>`;

export const Heading = Template.bind({});

export const StyledHeading = Template.bind({});
StyledHeading.args = {
  style:
    'color: orange; --headline-family: Arial; --headline-size: 4em; --headline-weight: 500;',
};

export const IconHeading = Template.bind({});
IconHeading.args = {
  icon: 'check',
};

export const StyledIconHeading = Template.bind({});
StyledIconHeading.args = {
  icon: 'check',
  style: 'color: orange;',
};
