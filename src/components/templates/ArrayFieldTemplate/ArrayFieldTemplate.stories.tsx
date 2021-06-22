import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Templates/ArrayFieldTemplate',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: {
    definitions: {
      Thing: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            default: 'Default name',
          },
        },
      },
    },
    type: 'object',
    properties: {
      listOfStrings: {
        type: 'array',
        title: 'A list of strings',
        items: {
          type: 'string',
          default: 'bazinga',
        },
      },
      multipleChoicesList: {
        type: 'array',
        title: 'A multiple choices list',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'fuzz', 'qux'],
        },
        uniqueItems: true,
      },
      fixedItemsList: {
        type: 'array',
        title: 'A list of fixed items',
        items: [
          {
            title: 'A string value',
            type: 'string',
            default: 'lorem ipsum',
          },
          {
            title: 'a boolean value',
            type: 'boolean',
          },
        ],
        additionalItems: {
          title: 'Additional item',
          type: 'number',
        },
      },
      minItemsList: {
        type: 'array',
        title: 'A list with a minimal number of items',
        minItems: 3,
        items: {
          $ref: '#/definitions/Thing',
        },
      },
      defaultsAndMinItems: {
        type: 'array',
        title: 'List and item level defaults',
        minItems: 5,
        default: ['carp', 'trout', 'bream'],
        items: {
          type: 'string',
          default: 'unidentified',
        },
      },
      nestedList: {
        type: 'array',
        title: 'Nested list',
        items: {
          type: 'array',
          title: 'Inner list',
          items: {
            type: 'string',
            default: 'lorem ipsum',
          },
        },
      },
      unorderable: {
        title: 'Unorderable items',
        type: 'array',
        items: {
          type: 'string',
          default: 'lorem ipsum',
        },
      },
      unremovable: {
        title: 'Unremovable items',
        type: 'array',
        items: {
          type: 'string',
          default: 'lorem ipsum',
        },
      },
      noToolbar: {
        title: 'No add, remove and order buttons',
        type: 'array',
        items: {
          type: 'string',
          default: 'lorem ipsum',
        },
      },
      fixedNoToolbar: {
        title: 'Fixed array without buttons',
        type: 'array',
        items: [
          {
            title: 'A number',
            type: 'number',
            default: 42,
          },
          {
            title: 'A boolean',
            type: 'boolean',
            default: false,
          },
        ],
        additionalItems: {
          title: 'A string',
          type: 'string',
          default: 'lorem ipsum',
        },
      },
    },
  },
  uiSchema: {
    listOfStrings: {
      items: {
        'ui:emptyValue': '',
      },
    },
    multipleChoicesList: {
      'ui:widget': 'checkboxes',
    },
    fixedItemsList: {
      items: [
        {
          'ui:widget': 'textarea',
        },
        {
          'ui:widget': 'select',
        },
      ],
      additionalItems: {
        'ui:widget': 'updown',
      },
    },
    unorderable: {
      'ui:options': {
        orderable: false,
      },
    },
    unremovable: {
      'ui:options': {
        removable: false,
      },
    },
    noToolbar: {
      'ui:options': {
        addable: false,
        orderable: false,
        removable: false,
      },
    },
    fixedNoToolbar: {
      'ui:options': {
        addable: false,
        orderable: false,
        removable: false,
      },
    },
  },
}

export const AnyOf = DefaultStory.bind({})
AnyOf.args = {
  schema: {
    type: 'object',
    properties: {
      age: {
        type: 'integer',
        title: 'Age',
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          anyOf: [
            {
              properties: {
                foo: {
                  type: 'string',
                },
              },
            },
            {
              properties: {
                bar: {
                  type: 'string',
                },
              },
            },
          ],
        },
      },
    },
    anyOf: [
      {
        title: 'First method of identification',
        properties: {
          firstName: {
            type: 'string',
            title: 'First name',
            default: 'Chuck',
          },
          lastName: {
            type: 'string',
            title: 'Last name',
          },
        },
      },
      {
        title: 'Second method of identification',
        properties: {
          idCode: {
            type: 'string',
            title: 'ID code',
          },
        },
      },
    ],
  },
}
export const OneOf = DefaultStory.bind({})
OneOf.args = {
  schema: {
    type: 'object',
    oneOf: [
      {
        properties: {
          lorem: {
            type: 'string',
          },
        },
        required: ['lorem'],
      },
      {
        properties: {
          ipsum: {
            type: 'string',
          },
        },
        required: ['ipsum'],
      },
    ],
  },
}
export const AllOf = DefaultStory.bind({})
AllOf.args = {
  schema: {
    type: 'object',
    allOf: [
      {
        properties: {
          lorem: {
            type: ['string', 'boolean'],
            default: true,
          },
        },
      },
      {
        properties: {
          lorem: {
            type: 'boolean',
          },
          ipsum: {
            type: 'string',
          },
        },
      },
    ],
  },
}
