import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/TextWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
}

export const Number = DefaultStory.bind({})
Number.args = {
  schema: Type.Object({
    name: Type.Number({ title: 'Number', description: 'description' }),
  }),
}

export const Integer = DefaultStory.bind({})
Integer.args = {
  schema: Type.Object({
    name: Type.Integer({ title: 'Integer', description: 'description' }),
  }),
}

export const Limited = DefaultStory.bind({})
Limited.args = {
  schema: Type.Object({
    name: Type.Integer({
      title: 'Limited',
      minimum: 0,
      maximum: 10,
      description: 'min 0 - max 10',
    }),
  }),
}

export const Multiple = DefaultStory.bind({})
Multiple.args = {
  schema: Type.Object({
    name: Type.Integer({
      title: 'Multiple',
      minimum: 0,
      maximum: 10,
      multipleOf: 2,
      description: '0-2 multiple of 2',
    }),
  }),
}

export const LimitedFloat = DefaultStory.bind({})
LimitedFloat.args = {
  schema: Type.Object({
    name: Type.Number({
      title: 'Float',
      minimum: 0,
      maximum: 1,
      description: 'between 0 and 1',
    }),
  }),
}

export const MultipleFloat = DefaultStory.bind({})
MultipleFloat.args = {
  schema: Type.Object({
    name: Type.Number({
      title: 'Multiple Float',
      minimum: 0,
      maximum: 1,
      multipleOf: 0.01,
      description: 'between 0 and 1, multiple of 0.01',
    }),
  }),
}
