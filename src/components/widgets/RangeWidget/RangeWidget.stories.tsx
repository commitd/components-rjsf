import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/RangeWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    range: Type.Number({ title: 'Range', description: 'description' }),
  }),
  uiSchema: {
    range: {
      'ui:widget': 'range',
    },
  },
  showErrorList: true,
}

export const Constraints = DefaultStory.bind({})
Constraints.args = {
  schema: Type.Object({
    range: Type.Number({
      title: 'Range',
      description: 'description',
      minimum: 20,
      maximum: 80,
    }),
  }),
  uiSchema: {
    range: {
      'ui:widget': 'range',
    },
  },
}
