import { FormButton, styled } from '@committed/components'
import { FormProps, ThemeProps, utils, withTheme } from '@rjsf/core'
import React, { ComponentType } from 'react'
import { Fields } from '../fields'
import {
  ArrayFieldTemplate,
  ErrorList,
  FieldTemplate,
  ObjectFieldTemplate,
} from '../templates'
import { Widgets } from '../widgets'
const { getDefaultRegistry } = utils
const { fields, widgets } = getDefaultRegistry()

const DefaultChildren = () => <FormButton />

export function generateTheme<T>(): ThemeProps<T> {
  return {
    children: <DefaultChildren />,
    fields: { ...fields, ...Fields },
    widgets: {
      ...widgets,
      ...Widgets,
    },
    ArrayFieldTemplate,
    ErrorList,
    FieldTemplate,
    ObjectFieldTemplate,
  }
}

export function generateForm<T>(): ComponentType<FormProps<T>> {
  return styled(withTheme<T>(generateTheme<T>()), {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    outline: 'none',
    gap: '$3',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JSForm<T = any>({
  Form = generateForm<T>(),
  children = <DefaultChildren />,
  ...props
}: FormProps<T> & {
  Form?: ComponentType<FormProps<T>>
}) {
  return <Form {...props}>{children}</Form>
}
