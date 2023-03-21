import {
  Button,
  CSS,
  Dialog,
  DialogContent,
  DialogTrigger,
  Inline,
} from '@committed/components'
import React, { ComponentProps, FormEvent, useCallback, useState } from 'react'
import { generateForm, JSFormProps, JSFormSubmit } from '../JSForm'

export type JSFormDialogProps<T> = JSFormProps<T> & {
  dialog?: ComponentProps<typeof Dialog>
  css?: CSS
  cancelText?: string
  submitText?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JSFormDialog<T = any>({
  dialog,
  css,
  Form = generateForm<T>(),
  cancelText = 'Cancel',
  submitText = 'Submit',
  children,
  onSubmit,
  ...props
}: JSFormDialogProps<T>) {
  const [open, setOpen] = useState(false)

  const handleSubmit = useCallback(
    (e: JSFormSubmit<T>, n: FormEvent<HTMLFormElement>) => {
      onSubmit && onSubmit(e, n)
      setOpen(false)
    },
    [onSubmit, setOpen]
  )

  const handleOpen = useCallback(() => setOpen(true), [setOpen])

  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog modal={true} open={open} {...dialog}>
      <DialogTrigger onClick={handleOpen}>{children}</DialogTrigger>
      <DialogContent css={css as CSS} defaultClose={false}>
        <Form {...props} onSubmit={handleSubmit}>
          <Inline css={{ justifyContent: 'flex-end' }}>
            <Button variant="tertiary" type="button" onClick={handleClose}>
              {cancelText}
            </Button>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
          </Inline>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
