import { argsToAttributes } from './helper.js';

import '../components/AppIcon.js';

export default {
  title: 'App Components/AppIcon',
  component: 'app-icon',
  argTypes: {
    name: {
      description: 'Name of the icon',
    },
  },
};

const Template = args => `<app-icon ${argsToAttributes(args)}></app-icon>`;

export const ArrowCircleDown = Template.bind({});
ArrowCircleDown.args = {
  name: 'arrow-circle-down',
};

export const ArrowCircleLeft = Template.bind({});
ArrowCircleLeft.args = {
  name: 'arrow-circle-left',
};

export const ArrowCircleRight = Template.bind({});
ArrowCircleRight.args = {
  name: 'arrow-circle-right',
};

export const ArrowCircleUp = Template.bind({});
ArrowCircleUp.args = {
  name: 'arrow-circle-up',
};

export const Check = Template.bind({});
Check.args = {
  name: 'check',
};

export const CheckCircle = Template.bind({});
CheckCircle.args = {
  name: 'check-circle',
};

export const MinusCircle = Template.bind({});
MinusCircle.args = {
  name: 'minus-circle',
};

export const PlusCircle = Template.bind({});
PlusCircle.args = {
  name: 'plus-circle',
};

export const StyledIcon = Template.bind({});
StyledIcon.args = {
  name: 'arrow-circle-down',
  style: 'color: orange; --icon-width: 3em;',
};
