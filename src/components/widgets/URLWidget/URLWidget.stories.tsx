import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { URLWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/URLWidget',
  component: URLWidget,
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
