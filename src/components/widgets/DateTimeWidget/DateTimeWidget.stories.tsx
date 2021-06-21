import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { DateTimeWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/DateTimeWidget',
  component: DateTimeWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    datetime: Type.String({
      title: 'Date Time',
      description: 'description',
      format: 'date-time',
    }),
  }),
}
