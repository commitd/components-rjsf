import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/ColorWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    color: Type.String({
      title: 'Color',
      description: 'description',
      format: 'color',
    }),
  }),
}
