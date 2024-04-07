import { Meta, StoryObj } from '@storybook/angular';

import { CompletedTasksComponent } from './completed-tasks.component';

type ComponentWithCustomControls = CompletedTasksComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Completed Tasks',
  component: CompletedTasksComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `CompletedTasks` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const CompletedTasks: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
