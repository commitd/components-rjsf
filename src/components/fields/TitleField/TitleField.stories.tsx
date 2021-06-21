import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { TitleField } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Fields/TitleField',
  component: TitleField,
} as Meta

export const Default: Story = (args) => {
  const schema: JSONSchema7 = {
    title: 'Schema dependencies',
    description: 'These samples are best viewed without live validation.',
    type: 'object',
    properties: {
      simple: {
        src: 'https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies',
        title: 'Simple',
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          credit_card: {
            type: 'number',
          },
        },
        required: ['name'],
        dependencies: {
          credit_card: {
            properties: {
              billing_address: {
                type: 'string',
              },
            },
            required: ['billing_address'],
          },
        },
      },
      conditional: {
        title: 'Conditional',
        $ref: '#/definitions/person',
      },
      arrayOfConditionals: {
        title: 'Array of conditionals',
        type: 'array',
        items: {
          $ref: '#/definitions/person',
        },
      },
      fixedArrayOfConditionals: {
        title: 'Fixed array of conditionals',
        type: 'array',
        items: [
          {
            title: 'Primary person',
            $ref: '#/definitions/person',
          },
        ],
        additionalItems: {
          title: 'Additional person',
          $ref: '#/definitions/person',
        },
      },
    },
    definitions: {
      person: {
        title: 'Person',
        type: 'object',
        properties: {
          'Do you have any pets?': {
            type: 'string',
            enum: ['No', 'Yes: One', 'Yes: More than one'],
            default: 'No',
          },
        },
        required: ['Do you have any pets?'],
        dependencies: {
          'Do you have any pets?': {
            oneOf: [
              {
                properties: {
                  'Do you have any pets?': {
                    enum: ['No'],
                  },
                },
              },
              {
                properties: {
                  'Do you have any pets?': {
                    enum: ['Yes: One'],
                  },
                  'How old is your pet?': {
                    type: 'number',
                  },
                },
                required: ['How old is your pet?'],
              },
              {
                properties: {
                  'Do you have any pets?': {
                    enum: ['Yes: More than one'],
                  },
                  'Do you want to get rid of any?': {
                    type: 'boolean',
                  },
                },
                required: ['Do you want to get rid of any?'],
              },
            ],
          },
        },
      },
    },
  }

  const uiSchema = {
    simple: {
      credit_card: {
        'ui:help':
          'If you enter anything here then billing_address will be dynamically added to the form.',
      },
    },
    conditional: {
      'Do you want to get rid of any?': {
        'ui:widget': 'radio',
      },
    },
    arrayOfConditionals: {
      items: {
        'Do you want to get rid of any?': {
          'ui:widget': 'radio',
        },
      },
    },
    fixedArrayOfConditionals: {
      items: {
        'Do you want to get rid of any?': {
          'ui:widget': 'radio',
        },
      },
      additionalItems: {
        'Do you want to get rid of any?': {
          'ui:widget': 'radio',
        },
      },
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
