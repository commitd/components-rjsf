import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { TextWidget } from '.'
import { JSForm } from '../../JSForm'

export default {
  title: 'Widgets/TextWidget',
  component: TextWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  })
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
