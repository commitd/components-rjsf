import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { UnsupportedField } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Fields/UnsupportedField',
  component: UnsupportedField,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        // @ts-ignore
        type: 'test_type',
        title: 'First name',
        default: 'Test',
      },
    },
  }

  const uiSchema = {}

  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      {...args}
    />
  )
}
