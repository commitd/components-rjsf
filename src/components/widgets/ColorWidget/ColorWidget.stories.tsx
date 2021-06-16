import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { ColorWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Components/ColorWidget',
  component: ColorWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.String({
      title: 'Color',
      description: 'description',
      format: 'color',
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
