import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/TextareaWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    textarea: Type.String({ title: 'Textarea', description: 'description' }),
  }),
  uiSchema: {
    textarea: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    },
  },
}
