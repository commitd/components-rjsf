import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { DescriptionField } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Fields/DescriptionField',
  component: DescriptionField,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
}
