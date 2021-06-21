import { Heading, Monospace } from '@committed/components'
import { FieldProps } from '@rjsf/core'
import React, { FC } from 'react'
import { REQUIRED_FIELD_SYMBOL } from '../../../utils'

export const TitleField: FC<FieldProps> = ({ id, title, required }) => (
  <Heading as="legend" variant="h6" id={id}>
    {title}
    {required && (
      <Monospace size={-1} css={{ color: '$error', verticalAlign: 'super' }}>
        {REQUIRED_FIELD_SYMBOL}
      </Monospace>
    )}
  </Heading>
)
