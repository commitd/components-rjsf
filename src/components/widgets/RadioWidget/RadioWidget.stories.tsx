import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { RadioWidget } from '.'
import { JSForm } from '../../JSForm'
import { JSONSchema7 } from 'json-schema'

export default {
  title: 'Components/RadioWidget',
  component: RadioWidget,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {
    definitions: {
      format: {
        title: 'Format',
        type: 'string',
        oneOf: [
          {
            title: 'PNG',
            const: 'png',
          },
          {
            title: 'JPG',
            const: 'jpg',
          },
          {
            title: 'SVG',
            const: 'svg',
          },
        ],
      },
    },
    title: 'Image editor',
    type: 'object',
    required: [],
    properties: {
      format: {
        title: 'Choose format',
        $ref: '#/definitions/format',
      },
    },
  }
  return (
    <JSForm
      schema={schema}
      uiSchema={{
        format: {
          'ui:widget': 'radio',
        },
      }}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}
export const Toggle: Story = (args) => {
  const schema: JSONSchema7 = {
    definitions: {
      Toggle: {
        title: 'Toggle',
        type: 'boolean',
        oneOf: [
          {
            title: 'Enable',
            const: true,
          },
          {
            title: 'Disable',
            const: false,
          },
        ],
      },
    },
    title: 'Image editor',
    type: 'object',
    required: [],
    properties: {
      toggleMask: {
        title: 'Apply color mask',
        $ref: '#/definitions/Toggle',
      },
    },
  }
  return (
    <JSForm
      schema={schema}
      uiSchema={{
        toggleMask: {
          'ui:widget': 'radio',
          'ui:options': {
            inline: true,
          },
        },
      }}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}
