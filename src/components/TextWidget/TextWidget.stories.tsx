import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { TextWidget } from '.'
import { JSForm } from '../'
import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/TextWidget',
  component: TextWidget,
} as Meta

export const Default: Story<ComponentProps<typeof JSForm>> = ({
  schema = Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
  onSubmit = action('submit'),
  ...args
}) => {
  return <JSForm schema={schema} onSubmit={onSubmit} {...args} />
}
