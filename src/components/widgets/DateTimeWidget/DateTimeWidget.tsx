import { utils, WidgetProps } from '@rjsf/core'
import React, { FC } from 'react'
import { TextWidget } from '../TextWidget'

const { localToUTC, utcToLocal } = utils

export const DateTimeWidget: FC<WidgetProps> = (props) => {
  const value = utcToLocal(props.value as string)
  const onChange = (value: string) => {
    props.onChange(localToUTC(value))
  }

  return (
    <TextWidget
      {...props}
      value={value}
      onValueChange={onChange}
      type="datetime-local"
    />
  )
}
