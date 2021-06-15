import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { DateWidget } from '.'
import { JSForm } from '../../JSForm'

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
