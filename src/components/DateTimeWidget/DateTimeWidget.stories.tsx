import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '../'
import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { DateTimeWidget } from '.'

export default {
  title: 'Components/DateTimeWidget',
  component: DateTimeWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    datetime: Type.String({
      title: 'Date Time',
      description: 'description',
      format: 'date-time',
    }),
  })
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
