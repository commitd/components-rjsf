import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CheckboxesWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Widgets/CheckboxesWidget',
  component: CheckboxesWidget,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {
    type: 'array',
    title: 'A multiple-choice list',
    items: {
      type: 'string',
      enum: ['foo', 'bar', 'fuzz', 'qux'],
    },
    uniqueItems: true,
  }

  const uiSchema = {
    'ui:widget': 'checkboxes',
  }

  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      {...args}
    />
  )
}
export const Inline: Story = (args) => {
  const schema: JSONSchema7 = {
    type: 'array',
    title: 'A multiple-choice list',
    items: {
      type: 'string',
      enum: ['foo', 'bar', 'fuzz', 'qux'],
    },
    uniqueItems: true,
  }

  const uiSchema = {
    'ui:widget': 'checkboxes',
    'ui:options': {
      inline: true,
    },
  }

  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      {...args}
    />
  )
}
