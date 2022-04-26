import { utils, WidgetProps } from '@rjsf/core'
import React, { FC, useCallback } from 'react'
import { TextWidget } from '../TextWidget'

const { localToUTC, utcToLocal } = utils

export const DateTimeWidget: FC<WidgetProps> = ({ onChange, ...props }) => {
  const value = utcToLocal(props.value as string)

  const onValueChange = useCallback(
    (value: string) => {
      onChange(localToUTC(value))
    },
    [onChange]
  )

  return (
    <TextWidget
      {...props}
      value={value}
      onChange={onValueChange}
      type="datetime-local"
    />
  )
}
