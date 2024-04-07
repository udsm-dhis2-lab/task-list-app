import { Meta, StoryObj } from '@storybook/angular';

import { CurrentTasksComponent } from './current-tasks.component';

type ComponentWithCustomControls = CurrentTasksComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Current Tasks',
  component: CurrentTasksComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `CurrentTasks` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const CurrentTasks: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
