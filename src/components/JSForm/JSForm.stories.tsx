import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormButton,
  Monospace,
} from '@committed/components'
import { useBoolean } from '@committed/hooks'
import { Type } from '@sinclair/typebox'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { JSForm } from '.'
import { allArgTypes, DefaultStory } from '../../utils/utils.stories'

export default {
  title: 'JSForm',
  component: JSForm,
  argTypes: allArgTypes,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
}

export const Simple = DefaultStory.bind({})
Simple.args = {
  schema: Type.Object({
    firstName: Type.String({
      title: 'First Name',
      description: 'Your first, or given, name.',
    }),
    familyName: Type.String({
      title: 'Family Name',
      description: 'Your family, or second, name.',
    }),
  }),
}

export const Nested = DefaultStory.bind({})
Nested.args = {
  schema: {
    title: 'A list of tasks',
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        title: 'Task list title',
      },
      tasks: {
        type: 'array',
        title: 'Tasks',
        items: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              title: 'Title',
              description: 'A sample title',
            },
            details: {
              type: 'string',
              title: 'Task details',
              description: 'Enter the task details',
            },
            done: {
              type: 'boolean',
              title: 'Done?',
              default: false,
            },
          },
        },
      },
    },
  },
  uiSchema: {
    tasks: {
      items: {
        details: {
          'ui:widget': 'textarea',
        },
      },
    },
  },
}

export const SubmitRight = DefaultStory.bind({})
SubmitRight.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
  buttons: <FormButton style={{ alignSelf: 'flex-end' }} />,
}

type TSDemoFormData = {
  name: string
}

export const TSDemo: Story = () => {
  const [isOpen, { setTrue, setFalse }] = useBoolean(false)
  const [formData, setFormData] = useState<TSDemoFormData>()

  return (
    <div>
      <JSForm<TSDemoFormData>
        schema={Type.Object({
          name: Type.String({ title: 'Name', description: 'description' }),
        })}
        onSubmit={(e) => {
          setFormData(e.formData)
          setTrue()
        }}
      />
      <Dialog open={isOpen} onOpenChange={setFalse}>
        <DialogContent>
          <DialogTitle>Form Data</DialogTitle>
          <Monospace css={{ mt: '$3' }}>
            {JSON.stringify(formData, null, 2)}
          </Monospace>
        </DialogContent>
      </Dialog>
    </div>
  )
}
TSDemo.parameters = {
  docs: {
    storyDescription: `Use the \`generateForm\` function with generics to get a correctly typed form: 
\`\`\`
type TSDemoFormData = {
  name: string
}
const TSDemoForm = generateForm<TSDemoFormData>()
\`\`\``,
  },
}
