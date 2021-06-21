import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { EmailWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/EmailWidget',
  component: EmailWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({
      title: 'Email',
      description: 'description',
      format: 'email',
    }),
  }),
}
