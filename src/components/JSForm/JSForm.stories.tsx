import React, { ComponentProps } from 'react'
import { action } from '@storybook/addon-actions'
import { Type } from '@sinclair/typebox'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '.'

export default {
  title: 'Components/JSForm',
  component: JSForm,
} as Meta

export const Default: Story<ComponentProps<typeof JSForm>> = ({
  schema = Type.Object({
    name: Type.String({ name: 'Name', description: 'description' }),
  }),
  onSubmit = action('submit'),
  ...args
}) => {
  return <JSForm schema={schema} onSubmit={onSubmit} {...args} />
}

export const Simple = Default.bind({})
Simple.args = {
  schema: Type.Object({
    firstName: Type.String({
      name: 'First Name',
      description: 'Your first, or given, name.',
    }),
    familyName: Type.String({
      name: 'Family Name',
      description: 'Your family, or second, name.',
    }),
  }),
}
