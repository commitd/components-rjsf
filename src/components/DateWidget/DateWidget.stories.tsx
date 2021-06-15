import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '../'
import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { DateWidget } from '.'

export default {
  title: 'Components/DateWidget',
  component: DateWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    date: Type.String({
      title: 'Date',
      description: 'description',
      format: 'date',
    }),
  })
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
