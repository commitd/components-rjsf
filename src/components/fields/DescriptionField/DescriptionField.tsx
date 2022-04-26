import { Svg, Tooltip } from '@committed/components'
import { mdiAlertCircleOutline as path } from '@mdi/js'
import { FieldProps } from '@rjsf/core'
import React, { FC, forwardRef } from 'react'

export const Icon: React.FC<React.ComponentProps<typeof Svg>> = forwardRef(
  (props, forwardedRef) => (
    <Svg
      path={path}
      width="20px"
      height="20px"
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
    <Tooltip content={description as string} multiline>
      <Icon id={id} />
    </Tooltip>
  )
}
