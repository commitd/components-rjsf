import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { UpDownWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Components/UpDownWidget',
  component: UpDownWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    number: Type.Number({
      title: 'Number',
      description: 'description',
    }),
  })
  const uiSchema = {
    number: {
      'ui:widget': 'updown',
    },
  }
  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}

export const WithBounds: Story = (args) => {
  const schema = Type.Object({
    number: Type.Number({
      title: 'Number',
      description: 'description',
      minimum: 0,
      maximum: 10,
    }),
  })
  const uiSchema = {
    number: {
      'ui:widget': 'updown',
    },
  }
  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}

export const Integer: Story = (args) => {
  const schema = Type.Object({
    integer: Type.Integer({
      title: 'Number',
      description: 'description',
    }),
  })
  const uiSchema = {
    integer: {
      'ui:widget': 'updown',
    },
  }
  return (
    <JSForm
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={action('submit')}
      showErrorList
      {...args}
    />
  )
}

/**
 * Not clear to me why the normal input for number and integer wouldn't work this way too.
 * So made this work without the need to specify the uiSchema.
 */
export const WithoutUISchema: Story = (args) => {
  const schema = Type.Object({
    integer: Type.Integer({
      title: 'Number',
      description: 'description',
      minimum: 0,
      maximum: 10,
    }),
    number: Type.Number({
      title: 'Number',
      description: 'description',
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
