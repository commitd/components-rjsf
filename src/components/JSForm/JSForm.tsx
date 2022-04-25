import { FormButton, styled } from '@committed/components'
import { ThemeProps, utils, withTheme } from '@rjsf/core'
import React from 'react'
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

const Theme: ThemeProps = {
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
const Themed = withTheme(Theme)
export const JSForm = styled(Themed, {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  outline: 'none',
  gap: '$3',
})
JSForm.displayName = 'JSForm'
