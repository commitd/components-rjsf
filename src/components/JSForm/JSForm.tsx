import React from 'react'
import { withTheme, ThemeProps, utils } from '@rjsf/core'
import { Box, Button } from '@committed/components'

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
  fields: { ...fields },
  widgets: { ...widgets },
}

export const JSForm = withTheme(Theme)