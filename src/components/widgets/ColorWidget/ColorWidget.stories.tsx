import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { ColorWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/ColorWidget',
  component: ColorWidget,
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
