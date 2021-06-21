import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { SelectWidget } from '.'
import { JSForm } from '../../JSForm'
import { JSONSchema7 } from 'json-schema'

export default {
  title: 'Widgets/SelectWidget',
  component: SelectWidget,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        description: 'description',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
  }
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}

export const WithTitle: Story = (args) => {
  const schema: JSONSchema7 = {
    title: 'Browsers',
    description: 'A text field with example values.',
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
    required: ['browser'],
  }
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
