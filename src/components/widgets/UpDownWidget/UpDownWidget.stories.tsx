import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/UpDownWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    number: Type.Number({
      title: 'Number',
      description: 'description',
    }),
  }),
  uiSchema: {
    number: {
      'ui:widget': 'updown',
    },
  },
  showErrorList: true,
}

export const WithBounds = DefaultStory.bind({})
WithBounds.args = {
  schema: Type.Object({
    number: Type.Number({
      title: 'Number',
      description: 'description',
      minimum: 0,
      maximum: 10,
    }),
  }),
  uiSchema: {
    number: {
      'ui:widget': 'updown',
    },
  },
}

export const Integer = DefaultStory.bind({})
Integer.args = {
  schema: Type.Object({
    integer: Type.Integer({
      title: 'Integer',
      description: 'description',
    }),
  }),
  uiSchema: {
    integer: {
      'ui:widget': 'updown',
    },
  },
}

/**
 * Not clear to me why the normal input for number and integer wouldn't work this way too.
 * So made this work without the need to specify the uiSchema.
 */
export const WithoutUISchema = DefaultStory.bind({})
WithoutUISchema.args = {
  schema: Type.Object({
    integer: Type.Integer({
      title: 'Integer',
      description: 'description',
      minimum: 0,
      maximum: 10,
    }),
    number: Type.Number({
      title: 'Number',
      description: 'description',
    }),
  }),
}
