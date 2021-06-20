import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { EmailWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Widgets/EmailWidget',
  component: EmailWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.String({
      title: 'Email',
      description: 'description',
      format: 'email',
    }),
  })
  return (
    <JSForm
      schema={schema}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}
