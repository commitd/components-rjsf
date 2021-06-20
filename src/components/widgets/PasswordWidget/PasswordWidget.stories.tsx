import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { PasswordWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Widgets/PasswordWidget',
  component: PasswordWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    password: Type.String({
      title: 'Password',
      description: 'description',
      format: 'password',
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
