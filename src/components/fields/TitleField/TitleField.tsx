import { Heading } from '@committed/components'
import { FieldProps } from '@rjsf/core'
import React, { FC } from 'react'

export const TitleField: FC<FieldProps> = ({ title }) => (
  <Heading as="legend" variant="h6">
    {title}
  </Heading>
)
