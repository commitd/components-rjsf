import { WidgetProps } from '@rjsf/core'
import React, { FC } from 'react'
import { TextWidget } from '../TextWidget'

// All logic required for updown already exists in the TextWidget.
export const UpDownWidget: FC<WidgetProps> = (props) => {
  return <TextWidget {...props} />
}
