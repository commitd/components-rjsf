import { Meta } from '@storybook/react'
import { CheckboxesWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/CheckboxesWidget',
  component: CheckboxesWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    type: 'array',
    title: 'A multiple-choice list',
    items: {
      type: 'string',
      enum: ['foo', 'bar', 'fuzz', 'qux'],
    },
    uniqueItems: true,
  },
  uiSchema: {
    'ui:widget': 'checkboxes',
  },
}

export const Inline = DefaultStory.bind({})
Inline.args = {
  schema: {
    type: 'array',
    title: 'A multiple-choice list',
    items: {
      type: 'string',
      enum: ['foo', 'bar', 'fuzz', 'qux'],
    },
    uniqueItems: true,
  },
  uiSchema: {
    'ui:widget': 'checkboxes',
    'ui:options': {
      inline: true,
    },
  },
}
