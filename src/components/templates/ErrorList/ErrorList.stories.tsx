import { Meta } from '@storybook/react'
import { argTypes, DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Templates/ErrorList',
  argTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
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
  formData: {
    firstName: 'Chuck',
    active: 'wrong',
    skills: ['karate', 'budo', 'aikido'],
    multipleChoicesList: ['foo', 'bar', 'fuzz'],
  },
  showErrorList: true,
}

export const ErrorSchema = DefaultStory.bind({})
ErrorSchema.args = {
  schema: {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
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
      age: {
        type: 'integer',
        title: 'Age',
      },
      bio: {
        type: 'string',
        title: 'Bio',
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 3,
      },
      telephone: {
        type: 'string',
        title: 'Telephone',
        minLength: 10,
      },
    },
  },
  uiSchema: {
    firstName: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
    },
    age: {
      'ui:widget': 'updown',
      'ui:title': 'Age of person',
      'ui:description': '(earthian year)',
    },
    bio: {
      'ui:widget': 'textarea',
    },
    password: {
      'ui:widget': 'password',
      'ui:help': 'Hint: Make it strong!',
    },
    date: {
      'ui:widget': 'alt-datetime',
    },
    telephone: {
      'ui:options': {
        inputType: 'tel',
      },
    },
  },
  extraErrors: {
    firstName: {
      __errors: ['some error that got added as a prop'],
    },
  },
  formData: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
  },
  showErrorList: true,
}
