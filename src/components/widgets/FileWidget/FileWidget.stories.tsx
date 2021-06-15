import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { FileWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Components/FileWidget',
  component: FileWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    file: Type.String({
      title: 'File',
      description: 'description',
      format: 'data-url',
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

export const Files: Story = (args) => {
  const schema = Type.Object({
    files: Type.Array(
      Type.String({
        format: 'data-url',
      }),
      { title: 'Files', description: 'description' }
    ),
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
