import { WidgetProps } from '@rjsf/core'
import React, { FC } from 'react'
import { TextWidget } from '../TextWidget'

export const URLWidget: FC<WidgetProps> = (props) => {
  return <TextWidget {...props} type="url" />
}
