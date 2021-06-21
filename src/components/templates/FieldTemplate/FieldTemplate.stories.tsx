import { Meta } from '@storybook/react'
import { FieldTemplate } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Templates/FieldTemplate',
  component: FieldTemplate,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    title: 'Widgets',
    type: 'object',
    properties: {
      stringFormats: {
        type: 'object',
        title: 'String formats',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          uri: {
            type: 'string',
            format: 'uri',
          },
        },
      },
      boolean: {
        type: 'object',
        title: 'Boolean field',
        properties: {
          default: {
            type: 'boolean',
            title: 'checkbox (default)',
            description: 'This is the checkbox-description',
          },
          radio: {
            type: 'boolean',
            title: 'radio buttons',
            description: 'This is the radio-description',
          },
          select: {
            type: 'boolean',
            title: 'select box',
            description: 'This is the select-description',
          },
        },
      },
      string: {
        type: 'object',
        title: 'String field',
        properties: {
          default: {
            type: 'string',
            title: 'text input (default)',
          },
          textarea: {
            type: 'string',
            title: 'textarea',
          },
          placeholder: {
            type: 'string',
          },
          color: {
            type: 'string',
            title: 'color picker',
            default: '#151ce6',
          },
        },
      },
      secret: {
        type: 'string',
        default: "I'm a hidden string.",
      },
      disabled: {
        type: 'string',
        title: 'A disabled field',
        default: 'I am disabled.',
      },
      readonly: {
        type: 'string',
        title: 'A readonly field',
        default: 'I am read-only.',
      },
      readonly2: {
        type: 'string',
        title: 'Another readonly field',
        default: 'I am also read-only.',
        readOnly: true,
      },
      widgetOptions: {
        title: 'Custom widget with options',
        type: 'string',
        default: 'I am yellow',
      },
      selectWidgetOptions: {
        title: 'Custom select widget with options',
        type: 'string',
        enum: ['foo', 'bar'],
        //@ts-ignore
        enumNames: ['Foo', 'Bar'],
      },
    },
  },
  uiSchema: {
    boolean: {
      radio: {
        'ui:widget': 'radio',
      },
      select: {
        'ui:widget': 'select',
      },
    },
    string: {
      textarea: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 5,
        },
      },
      placeholder: {
        'ui:placeholder': 'This is a placeholder',
      },
      color: {
        'ui:widget': 'color',
      },
    },
    secret: {
      'ui:widget': 'hidden',
    },
    disabled: {
      'ui:disabled': true,
    },
    readonly: {
      'ui:readonly': true,
    },
    widgetOptions: {
      'ui:options': {
        backgroundColor: 'yellow',
      },
    },
    selectWidgetOptions: {
      'ui:options': {
        backgroundColor: 'pink',
      },
    },
  },
}

export const Additional = DefaultStory.bind({})
Additional.args = {
  schema: {
    title: 'A customizable registration form',
    description: 'A simple form with additional properties example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    additionalProperties: {
      type: 'string',
    },
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
      },
      lastName: {
        type: 'string',
        title: 'Last name',
      },
    },
  },
}

export const WithErrors = DefaultStory.bind({})
WithErrors.args = {
  schema: {
    title: 'Contextualized errors',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
        minLength: 8,
        pattern: '\\d+',
      },
      active: {
        type: 'boolean',
        title: 'Active',
      },
      skills: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 5,
        },
      },
      multipleChoicesList: {
        type: 'array',
        title: 'Pick max two items',
        uniqueItems: true,
        maxItems: 2,
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'fuzz'],
        },
      },
    },
  },
  showErrorList: true,
}
