import React, { FC } from 'react'
import { utils, WidgetProps } from '@rjsf/core'
import { TextWidget } from '../TextWidget'

const { localToUTC, utcToLocal } = utils

export const DateTimeWidget: FC<WidgetProps> = (props) => {
  const value = utcToLocal(props.value)
  const onChange = (value: string) => {
    props.onChange(localToUTC(value))
  }

  return (
    <TextWidget
      {...props}
      value={value}
      onChange={onChange}
      type="datetime-local"
    />
  )
}
