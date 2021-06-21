import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { TextWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/TextWidget',
  component: TextWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
}
