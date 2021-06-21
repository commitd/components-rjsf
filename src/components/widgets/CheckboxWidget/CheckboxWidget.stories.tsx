import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { CheckboxWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/CheckboxWidget',
  component: CheckboxWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.Optional(
      Type.Boolean({ title: 'Checkbox', description: 'description' })
    ),
  }),
}

export const Required = DefaultStory.bind({})
Required.args = {
  schema: Type.Object({
    name: Type.Boolean({
      title: 'Checkbox',
      description: 'description',
    }),
  }),
}
