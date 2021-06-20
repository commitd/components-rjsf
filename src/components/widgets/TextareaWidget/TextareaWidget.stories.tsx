import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { TextareaWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Widgets/TextareaWidget',
  component: TextareaWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    textarea: Type.String({ title: 'Textarea', description: 'description' }),
  })
  const uiSchema = {
    textarea: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
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
