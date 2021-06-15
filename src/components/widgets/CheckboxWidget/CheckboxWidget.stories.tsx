import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { JSForm } from '../../JSForm'
import { Type } from '@sinclair/typebox'
import { action } from '@storybook/addon-actions'
import { CheckboxWidget } from '.'

export default {
  title: 'Components/CheckboxWidget',
  component: CheckboxWidget,
} as Meta

export const Default: Story = (args) => {
  const schema = Type.Object({
    name: Type.Boolean({ title: 'Checkbox', description: 'description' }),
  })
  return <JSForm schema={schema} onSubmit={action('submit')} {...args} />
}
