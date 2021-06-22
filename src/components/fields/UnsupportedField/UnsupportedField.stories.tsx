import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Fields/UnsupportedField',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        // @ts-ignore
        type: 'test_type',
        title: 'First name',
        default: 'Test',
      },
    },
  },
}
