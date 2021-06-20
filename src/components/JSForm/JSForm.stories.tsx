import React, { ComponentProps } from 'react'
import { action } from '@storybook/addon-actions'
import { Type } from '@sinclair/typebox'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '.'

export default {
  title: 'JSForm',
  component: JSForm,
} as Meta

export const Default: Story<ComponentProps<typeof JSForm>> = ({
  schema = Type.Object({
    name: Type.String({ name: 'Name', description: 'description' }),
  }),
  onSubmit = action('submit'),
  ...args
}) => {
  return <JSForm schema={schema} onSubmit={onSubmit} {...args} />
}

export const Simple = Default.bind({})
Simple.args = {
  schema: Type.Object({
    firstName: Type.String({
      name: 'First Name',
      description: 'Your first, or given, name.',
    }),
    familyName: Type.String({
      name: 'Family Name',
      description: 'Your family, or second, name.',
    }),
  }),
}

export const Nested = Default.bind({})
Nested.args = {
  schema: {
    title: 'A list of tasks',
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        title: 'Task list title',
      },
      tasks: {
        type: 'array',
        title: 'Tasks',
        items: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              title: 'Title',
              description: 'A sample title',
            },
            details: {
              type: 'string',
              title: 'Task details',
              description: 'Enter the task details',
            },
            done: {
              type: 'boolean',
              title: 'Done?',
              default: false,
            },
          },
        },
      },
    },
  },
  uiSchema: {
    tasks: {
      items: {
        details: {
          'ui:widget': 'textarea',
        },
      },
    },
  },
}
