import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { RangeWidget } from '.'
import { JSForm } from '../../JSForm'
import { JSONSchema7 } from 'json-schema'

export default {
  title: 'Widgets/RangeWidget',
  component: RangeWidget,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = Type.Object({
    range: Type.Number({ title: 'Checkbox', description: 'description' }),
  })
  return (
    <JSForm
      schema={schema}
      uiSchema={{
        range: {
          'ui:widget': 'range',
        },
      }}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}

export const Constraints: Story = (args) => {
  const schema: JSONSchema7 = Type.Object({
    range: Type.Number({
      title: 'Checkbox',
      description: 'description',
      minimum: 20,
      maximum: 80,
    }),
  })
  return (
    <JSForm
      schema={schema}
      uiSchema={{
        range: {
          'ui:widget': 'range',
        },
      }}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}
