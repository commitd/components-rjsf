import { Meta } from '@storybook/react'
import { SelectWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/SelectWidget',
  component: SelectWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        description: 'description',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
  },
}

export const WithTitle = DefaultStory.bind({})
WithTitle.args = {
  schema: {
    title: 'Browsers',
    description: 'A text field with example values.',
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
    required: ['browser'],
  },
}
