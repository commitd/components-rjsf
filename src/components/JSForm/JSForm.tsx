import { Box, Button } from '@committed/components'
import { ThemeProps, utils, withTheme } from '@rjsf/core'
import React from 'react'
import { Fields } from '../fields'
import {
  ArrayFieldTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
} from '../templates'
import { Widgets } from '../widgets'

const { getDefaultRegistry } = utils
const { fields, widgets } = getDefaultRegistry()

const DefaultChildren = () => (
  <Box css={{ mt: '$4' }}>
    <Button type="submit" variant={'primary' as const}>
      Submit
    </Button>
  </Box>
)

const Theme: ThemeProps = {
  children: <DefaultChildren />,
  fields: { ...fields, ...Fields },
  widgets: {
    ...widgets,
    ...Widgets,
  },
  FieldTemplate,
  ObjectFieldTemplate,
  ArrayFieldTemplate,
}

export const JSForm = withTheme(Theme)
JSForm.displayName = 'JSForm'
