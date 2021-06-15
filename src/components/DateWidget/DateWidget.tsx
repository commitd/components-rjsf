import { WidgetProps } from '@rjsf/core'
import React, { FC } from 'react'
import { TextWidget } from '../TextWidget'

export const DateWidget: FC<WidgetProps> = (props) => {
  return <TextWidget {...props} type="date" />
}
