import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/URLWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({
      title: 'URL',
      description: 'description',
      format: 'url',
    }),
  }),
}
