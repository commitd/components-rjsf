import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Templates/FieldTemplate',
  argTypes,
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
        required: ['email'],
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
    required: ['stringFormats', 'string', 'secret', 'selectWidgetOptions'],
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

const requiredExampleSchema = Type.Object({
  required: Type.String({
    title: 'Required',
    description: 'This is marked as required by the schema.',
  }),
  optional: Type.Optional(
    Type.String({
      title: 'Optional',
      description: 'This is not marked as required in the schema.',
    })
  ),
})

export const DefaultLabels = DefaultStory.bind({})
DefaultLabels.args = {
  schema: requiredExampleSchema,
}
DefaultLabels.parameters = {
  docs: {
    storyDescription:
      'By default labels not marked as required are shown as optional. This is considered best practice.',
  },
}

export const RequiredLabels = DefaultStory.bind({})
RequiredLabels.args = {
  schema: requiredExampleSchema,
  formContext: {
    showRequired: true,
  },
}
RequiredLabels.parameters = {
  docs: {
    storyDescription:
      'Add `showRequired: true` to the `formContext` to, instead, mark required labels with an asterisk. This is no longer considered good practice.',
  },
}

export const NoOptionalLabels = DefaultStory.bind({})
NoOptionalLabels.args = {
  schema: requiredExampleSchema,
  formContext: {
    showOptional: false,
  },
}
NoOptionalLabels.parameters = {
  docs: {
    storyDescription:
      'Add `showOptional: false` th the `formContext` to remove the optional markers.',
  },
}
