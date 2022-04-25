import { Slider } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { FC, useState } from 'react'

const { rangeSpec } = utils

export const RangeWidget: FC<WidgetProps> = ({
  id,
  schema,
  value,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) => {
  const sliderProps = { label, id, ...rangeSpec(schema) }
  const [internalValue, setInternalValue] = useState(() => {
    const initialValue = [value || sliderProps.min || 0] as number[]
    if (!value) {
      onChange(initialValue[0])
    }
    return initialValue
  })

  const _onChange = (value: number[]) => {
    setInternalValue(value)
    onChange(value[0])
  }
  const _onBlur = () => onBlur(id, internalValue[0])
  const _onFocus = () => onFocus(id, internalValue[0])

  return (
    <Slider
      value={internalValue}
      disabled={disabled || readonly}
      onValueChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      // FIXME autoFocus={autofocus}
      {...sliderProps}
    />
  )
}
