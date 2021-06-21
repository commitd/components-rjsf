import { Meta } from '@storybook/react'
import { RadioWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/RadioWidget',
  component: RadioWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    definitions: {
      format: {
        title: 'Format',
        type: 'string',
        oneOf: [
          {
            title: 'PNG',
            const: 'png',
          },
          {
            title: 'JPG',
            const: 'jpg',
          },
          {
            title: 'SVG',
            const: 'svg',
          },
        ],
      },
    },
    title: 'Image editor',
    type: 'object',
    required: [],
    properties: {
      format: {
        title: 'Choose format',
        $ref: '#/definitions/format',
      },
    },
  },
  uiSchema: {
    format: {
      'ui:widget': 'radio',
    },
  },
  showErrorList: true,
}

export const Toggle = DefaultStory.bind({})
Toggle.args = {
  schema: {
    definitions: {
      Toggle: {
        title: 'Toggle',
        type: 'boolean',
        oneOf: [
          {
            title: 'Enable',
            const: true,
          },
          {
            title: 'Disable',
            const: false,
          },
        ],
      },
    },
    title: 'Image editor',
    type: 'object',
    required: ['toggleMask'],
    properties: {
      toggleMask: {
        title: 'Apply color mask',
        $ref: '#/definitions/Toggle',
      },
    },
  },
  uiSchema: {
    toggleMask: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
      },
    },
  },
}
