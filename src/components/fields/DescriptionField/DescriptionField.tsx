import { Svg, Tooltip } from '@committed/components'
import { mdiAlertCircleOutline } from '@mdi/js'
import { FieldProps } from '@rjsf/core'
import React, { FC, forwardRef } from 'react'

export const Icon: React.FC<React.ComponentProps<typeof Svg>> = forwardRef(
  (props, forwardedRef) => (
    <Svg
      path={mdiAlertCircleOutline}
      css={{ color: '$textSecondary' }}
      {...props}
      ref={forwardedRef}
    />
  )
)

export const DescriptionField: FC<FieldProps> = ({ id, description }) => {
  if (!description) {
    return null
  }
  return (
    <Tooltip id={id} content={description as string} multiline>
      <Icon />
    </Tooltip>
  )
}
