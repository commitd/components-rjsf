import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { PasswordWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/PasswordWidget',
  component: PasswordWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    password: Type.String({
      title: 'Password',
      description: 'description',
      format: 'password',
    }),
  }),
}
