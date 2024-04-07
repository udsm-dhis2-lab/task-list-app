import { Meta, StoryObj } from '@storybook/angular';

import { NeedCorrectionComponent } from './need-correction.component';

type ComponentWithCustomControls = NeedCorrectionComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Need Correction',
  component: NeedCorrectionComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `NeedCorrection` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const NeedCorrection: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
