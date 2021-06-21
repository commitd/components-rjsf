import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { DateWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/DateWidget',
  component: DateWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    date: Type.String({
      title: 'Date',
      description: 'description',
      format: 'date',
    }),
  }),
}
