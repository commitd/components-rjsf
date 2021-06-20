import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { MultiSchemaField } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Fields/MultiSchemaField',
  component: MultiSchemaField,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {}

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
