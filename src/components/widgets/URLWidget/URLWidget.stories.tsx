import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { URLWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Components/URLWidget',
  component: URLWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.String({
      title: 'URL',
      description: 'description',
      format: 'url',
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
