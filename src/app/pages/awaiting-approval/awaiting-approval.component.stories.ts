import { Meta, StoryObj } from '@storybook/angular';

import { AwaitingApprovalComponent } from './awaiting-approval.component';

type ComponentWithCustomControls = AwaitingApprovalComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Awaiting Approval',
  component: AwaitingApprovalComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `AwaitingApproval` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const AwaitingApproval: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
