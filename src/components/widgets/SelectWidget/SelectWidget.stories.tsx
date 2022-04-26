import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/SelectWidget',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        description: 'description',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
  },
}

export const WithTitle = DefaultStory.bind({})
WithTitle.args = {
  schema: {
    title: 'Browsers',
    description: 'A text field with example values.',
    type: 'object',
    properties: {
      browser: {
        type: 'string',
        title: 'Browser',
        enum: ['Firefox', 'Chrome', 'Opera', 'Vivaldi', 'Safari'],
      },
    },
    required: ['browser'],
  },
}

export const WithBoolean = DefaultStory.bind({})
WithBoolean.args = {
  schema: {
    title: 'Booleans',
    description: 'A boolean select.',
    type: 'object',
    properties: {
      boolean: {
        type: 'boolean',
        title: 'select box',
        description: 'This is the select-description',
      },
    },
  },
  uiSchema: {
    boolean: {
      'ui:widget': 'select',
    },
  },
}

export const WithArray = DefaultStory.bind({})
WithArray.args = {
  schema: {
    title: 'Cannot multiple select',
    description:
      'Selects are limited to a single value. For multi select use checkboxes.',
    type: 'object',
    properties: {
      select: {
        items: {
          enum: ['foo', 'bar', 'fuzz'],
          type: 'string',
        },
        maxItems: 2,
        title: 'Can only select one value',
        type: 'array',
        uniqueItems: true,
      },
      checkboxes: {
        items: {
          enum: ['foo', 'bar', 'fuzz'],
          type: 'string',
        },
        maxItems: 2,
        title: 'Pick max two items',
        type: 'array',
        uniqueItems: true,
      },
    },
  },
  uiSchema: {
    checkboxes: {
      'ui:widget': 'checkboxes',
    },
  },
}
