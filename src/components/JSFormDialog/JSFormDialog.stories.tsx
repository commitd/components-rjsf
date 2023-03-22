import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Monospace,
} from '@committed/components'
import { useBoolean } from '@committed/hooks'
import { ISubmitEvent } from '@rjsf/core'
import { Type } from '@sinclair/typebox'
import { Meta, Story } from '@storybook/react'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { JSFormDialog, JSFormDialogProps } from '.'

export default {
  title: 'JSFormDialog',
  component: JSFormDialog,
} as Meta

type Props = Omit<JSFormDialogProps<any>, 'schema'> & {
  schema?: JSONSchema7
}

const Template: Story<Props> = ({
  schema = Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
  ...args
}: Props) => {
  const [isOpen, { setTrue, setFalse }] = useBoolean(false)
  const [formData, setFormData] = React.useState()

  const handleSubmit = (e: ISubmitEvent<any>): void => {
    setFormData(e.formData)
    setTrue()
  }

  return (
    <div>
      <JSFormDialog schema={schema} onSubmit={handleSubmit} {...args}>
        <Button>Open</Button>
      </JSFormDialog>
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

export const Default = Template.bind({})
Default.args = {
  schema: Type.Object({
    name: Type.String({ title: 'Name', description: 'description' }),
  }),
}

export const Simple = Template.bind({})
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

export const Nested = Template.bind({})
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

type MyFormData = {
  first: string
  second: string
}

export const Typed: Story = () => {
  const handleSubmit = (e: ISubmitEvent<MyFormData>) => {
    alert(JSON.stringify(e.formData, null, 2))
  }

  return (
    <div>
      <JSFormDialog<MyFormData>
        schema={{
          title: 'name',
          type: 'object',
          required: ['first', 'second'],
          properties: {
            first: {
              type: 'string',
              title: 'First name',
            },
            second: {
              type: 'string',
              title: 'Surname',
            },
          },
        }}
        onSubmit={handleSubmit}
      >
        <Button>Open</Button>
      </JSFormDialog>
    </div>
  )
}

export const Controlled: Story = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: ISubmitEvent<MyFormData>) => {
    alert(JSON.stringify(e.formData, null, 2))
  }

  return (
    <div>
      <Checkbox label="Open" checked={open} onCheckedChange={setOpen} />
      <JSFormDialog<MyFormData>
        open={open}
        onOpenChange={setOpen}
        schema={{
          title: 'name',
          type: 'object',
          required: ['first', 'second'],
          properties: {
            first: {
              type: 'string',
              title: 'Firstname',
            },
            second: {
              type: 'string',
              title: 'Surname',
            },
          },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export const SetControlled: Story = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: ISubmitEvent<MyFormData>) => {
    alert(JSON.stringify(e.formData, null, 2))
  }

  return (
    <div>
      <Checkbox
        label="Open"
        checked={open}
        onCheckedChange={(value: boolean) => setOpen(value)}
      />
      <JSFormDialog<MyFormData>
        open={open}
        onOpenChange={setOpen}
        schema={{
          title: 'name',
          type: 'object',
          required: ['first', 'second'],
          properties: {
            first: {
              type: 'string',
              title: 'Firstname',
            },
            second: {
              type: 'string',
              title: 'Surname',
            },
          },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
