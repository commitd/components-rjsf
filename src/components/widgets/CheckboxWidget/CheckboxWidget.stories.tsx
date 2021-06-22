import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { DefaultStory, argTypes } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/CheckboxWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    checkbox: Type.Optional(
      Type.Boolean({ title: 'Checkbox', description: 'description' })
    ),
  }),
}

export const Required = DefaultStory.bind({})
Required.args = {
  schema: Type.Object({
    checkbox: Type.Boolean({
      title: 'Checkbox',
      description: 'description',
    }),
  }),
}
