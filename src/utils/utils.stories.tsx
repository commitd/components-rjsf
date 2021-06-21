import React, { ComponentProps } from 'react'
import { action } from '@storybook/addon-actions'
import { Type } from '@sinclair/typebox'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '../components/JSForm'

export const DefaultStory: Story<Partial<ComponentProps<typeof JSForm>>> = ({
  schema = Type.Object({
    name: Type.String({ name: 'Name', description: 'description' }),
  }),
  onSubmit = action('submit'),
  ...args
}) => {
  return <JSForm schema={schema} onSubmit={onSubmit} {...args} />
}
