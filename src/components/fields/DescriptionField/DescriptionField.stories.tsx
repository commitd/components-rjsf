import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import { Type } from '@sinclair/typebox'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { DescriptionField } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Fields/DescriptionField',
  component: DescriptionField,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  })
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
