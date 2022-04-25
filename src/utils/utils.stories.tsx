import {
  Dialog,
  DialogContent,
  Heading,
  Monospace,
} from '@committed/components'
import { useBoolean } from '@committed/hooks'
import { FormProps } from '@rjsf/core'
import { Type } from '@sinclair/typebox'
import { Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { JSForm } from '../components/JSForm'

export const argTypes = {
  schema: {
    control: { type: 'object' },
    description:
      'Form schema. We support JSON schema draft-07 by default. See [Schema Reference](https://json-schema.org/draft-07/json-schema-release-notes.html) for more information.',
    table: {
      type: {
        summary: 'JSONScehma7',
      },
    },
  },
  uiSchema: {
    control: { type: 'object' },
    description:
      'Addition properties to configure the form UI, see [docs](https://react-jsonschema-form.readthedocs.io/en/latest/quickstart/#form-uischema), [API](https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/) ',
    table: {
      type: {
        summary: 'UiSchema',
      },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description:
      "It's possible to disable the whole form by setting the `disabled` prop. The `disabled` prop is then forwarded down to each field of the form.",
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
  formData: {
    control: { type: 'object' },
    description:
      "Often you'll want to pre-fill a form with existing data; this is done by passing a `formData` prop object matching the schema.",
    table: {
      type: {
        summary: 'object',
      },
    },
  },
  showErrorList: {
    control: { type: 'boolean' },
    description:
      'When this prop is set to true, a list of errors will also show. When set to false, only inline input validation errors will be shown.',
    defaultValue: true,
  },
}

export const allArgTypes = {
  ...argTypes,
  acceptcharset: {
    control: { type: 'text' },
    description:
      'The value of this prop will be passed to the `accept-charset` [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-accept-charset).',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  action: {
    control: { type: 'text' },
    description: `The value of this prop will be passed to the \`action\` [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action).

Note that this just renders the \`action\` attribute in the HTML markup. There is no real network request being sent to this \`action\` on submit. Instead, react-jsonschema-form catches the submit event with \`event.preventDefault()\` and then calls the \`onSubmit\` function, where you could send a request programmatically with \`fetch\` or similar.`,
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  autoComplete: {
    control: {
      type: 'select',
      options: ['on', 'off'],
    },
    description:
      'The value of this prop will be passed to the autocomplete [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete).',
    table: {
      type: {
        summary: 'on | off',
      },
    },
  },
  children: {
    control: { type: undefined },
    description:
      "You can provide custom buttons to your form via the `Form` component's `children`. Otherwise a default submit button will be rendered.",
    table: {
      type: {
        summary: 'React.ReactNode',
      },
    },
  },
  enctype: {
    control: {
      type: 'select',
      options: [
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/plain',
      ],
    },
    description:
      'The value of this prop will be passed to the enctype [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype).',
    table: {
      type: {
        summary:
          'application/x-www-form-urlencoded | multipart/form-data | text/plain',
      },
    },
  },
  extraErrors: {
    control: { type: 'object' },
    description: `This prop allows passing in custom errors that are augmented with the existing JSON Schema errors on the form; it can be used to implement asynchronous validation. See [Validation](https://react-jsonschema-form.readthedocs.io/en/latest/usage/validation/) for more information.
      
e.g.
\`\`\`
{
  firstName: {
    __errors: [
      'some error that got added as a prop'
    ]
  }
}
\`\`\``,
    table: {
      type: {
        summary: 'object',
      },
    },
  },
  id: {
    control: { type: 'text' },
    description:
      'The value of this prop will be passed to the id [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form).',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  idPrefix: {
    control: { type: 'text' },
    description:
      'To avoid collisions with existing ids in the DOM, it is possible to change the prefix used for ids.',
    table: {
      defaultValue: 'root',
      type: {
        summary: 'string',
      },
    },
  },
  liveOmit: {
    control: { type: 'boolean' },
    table: {
      defaultValue: false,
      type: {
        summary: 'boolean',
      },
    },
    description:
      'If `omitExtraData` and `liveOmit` are both set to `true`, then extra form data values that are not in any form field will be removed whenever `onChange` is called.',
  },
  liveValidate: {
    control: { type: 'boolean' },
    description:
      'If set to true, the form will perform validation and show any validation errors whenever the form data is changed, rather than just on submit.',
    table: {
      defaultValue: false,
      type: {
        summary: 'boolean',
      },
    },
  },
  method: {
    control: { type: 'select', options: ['post', 'get', 'dialog'] },
    description:
      'The value of this prop will be passed to the `method` [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method).',
    table: {
      type: {
        summary: 'post | get | dialog',
      },
    },
  },
  name: {
    control: { type: 'text' },
    description:
      'The value of this prop will be passed to the `name` [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-name).',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  noHtml5Validate: {
    control: { type: 'boolean' },
    description: 'If set to true, turns off HTML5 validation on the form.',
    table: {
      defaultValue: false,
      type: {
        summary: 'boolean',
      },
    },
  },
  noValidate: {
    control: { type: 'boolean' },
    description: 'If set to true, turns off all validation.',
    table: {
      defaultValue: false,
      type: {
        summary: 'boolean',
      },
    },
  },
  omitExtraData: {
    control: { type: 'boolean' },
    description:
      'If set to `true`, then extra form data values that are not in any form field will be removed whenever `onSubmit` is called.',
    table: {
      defaultValue: false,
      type: {
        summary: 'boolean',
      },
    },
  },
  onBlur: {
    control: { type: undefined },
    description:
      'Sometimes you may want to trigger events or modify external state when a field has been touched, so you can pass an `onBlur` handler, which will receive the id of the input that was blurred and the field value.',
    table: {
      type: {
        summary:
          '(id: string, value: boolean | number | string | null) => void',
      },
    },
  },
  onChange: {
    control: { type: undefined },
    description:
      'If you plan on being notified every time the form data are updated, you can pass an `onChange` handler, which will receive the same args as `onSubmit` any time a value is updated in the form.',
    table: {
      type: {
        summary: '(e: IChangeEvent<T>, es?: ErrorSchema) => any',
      },
    },
  },
  onError: {
    control: { type: undefined },
    description:
      'To react when submitted form data are invalid, pass an `onError` handler. It will be passed the list of encountered errors.',
    table: {
      type: {
        summary: '(e: any) => any',
      },
    },
  },
  onFocus: {
    control: { type: undefined },
    description:
      'Sometimes you may want to trigger events or modify external state when a field has been focused, so you can pass an `onFocus` handler, which will receive the id of the input that is focused and the field value.',
    table: {
      type: {
        summary:
          '(id: string, value: boolean | number | string | null) => void',
      },
    },
  },
  onSubmit: {
    control: { type: undefined },
    description: `You can pass a function as the \`onSubmit\` prop of your \`JSForm\` component to listen to when the form is submitted and its data are valid. It will be passed a result object having a \`formData\` attribute, which is the valid form data you're usually after. The original event will also be passed as a second parameter.
    
Note: If there are fields in the \`formData\` that are not represented in the schema, they will be retained by default. If you would like to remove those extra values on form submission, you may need to set the \`omitExtraData\` and/or \`liveOmit\` props.`,
    table: {
      type: {
        summary: '(e: ISubmitEvent<any>) => any`',
      },
    },
  },
  target: {
    control: { type: 'text' },
    description:
      'The value of this prop will be passed to the `target` [HTML attribute on the form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target).',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  validate: {
    control: { type: undefined },
    description: 'To provide your own validation',
    table: {
      type: {
        summary: '(formData: T, errors: FormValidation) => FormValidation',
      },
    },
  },
}

type DefaultStoryProps = Omit<FormProps<any>, 'schema'> & {
  schema?: JSONSchema7
}

export const DefaultStory: Story<DefaultStoryProps> = ({
  schema = Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
  children,
  ...args
}: DefaultStoryProps) => {
  const [isOpen, { setTrue, setFalse }] = useBoolean(false)
  const [formData, setFormData] = React.useState()

  return (
    <div>
      <JSForm
        schema={schema}
        onSubmit={(e) => {
          setFormData(e.formData)
          setTrue()
        }}
        {...args}
      />
      <Dialog open={isOpen} onOpenChange={setFalse}>
        <DialogContent>
          <Heading variant="h5">Form Data</Heading>
          <Monospace css={{ mt: '$3' }}>
            {JSON.stringify(formData, null, 2)}
          </Monospace>
        </DialogContent>
      </Dialog>
    </div>
  )
}
