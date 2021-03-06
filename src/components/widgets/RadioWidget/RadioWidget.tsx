import { Radio, RadioGroup } from '@committed/components'
import { WidgetProps } from '@rjsf/core'
import React, { FC, FocusEvent } from 'react'
import { isOptions, Option } from '../../../utils'

export const RadioWidget: FC<WidgetProps> = ({
  id,
  schema,
  options,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  rawErrors = [],
}: WidgetProps) => {
  const { enumOptions, enumDisabled } = options

  if (!isOptions(enumOptions)) {
    throw new Error('Enum options is not an array')
  }

  const _onChange = (value: string) =>
    onChange(schema.type == 'boolean' ? value !== 'false' : value)
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  const row = options ? options.inline : false

  return (
    <RadioGroup
      value={`${value}`}
      orientation={row ? 'horizontal' : 'vertical'}
      onValueChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      error={rawErrors.length > 0}
    >
      {enumOptions.map((option: Option, index: number) => {
        const itemDisabled =
          enumDisabled && (enumDisabled as string[]).indexOf(option.value) != -1

        return (
          <Radio
            key={index}
            label={`${option.label}`}
            value={`${option.value}`}
            disabled={disabled || itemDisabled || readonly}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autofocus && index === 0}
          />
        )
      })}
    </RadioGroup>
  )
}
