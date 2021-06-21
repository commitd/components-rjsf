import { Input } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'
const { getDisplayLabel, rangeSpec } = utils

type InputProps = ComponentProps<typeof Input>

export type TextWidgetProps = WidgetProps &
  Pick<InputProps, Exclude<keyof InputProps, 'onBlur' | 'onFocus'>>

function getInputType(baseType: string) {
  if (baseType === 'string') {
    return 'text'
  }
  if (baseType === 'integer') {
    return 'number'
  }
  return baseType
}

export const TextWidget: FC<TextWidgetProps> = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  value,
  onChange,
  onBlur,
  onFocus,
  options,
  schema,
  rawErrors = [],
  // Extract and ignore these props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autofocus,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formContext,
  ...textFieldProps
}: TextWidgetProps) => {
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(value === '' ? options.emptyValue : value)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  const inputType = getInputType(type || schema.type)

  const rangeProps = inputType === 'number' ? { ...rangeSpec(schema) } : {}

  return (
    <Input
      id={id}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      type={inputType}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value || value === 0 ? value : ''}
      state={rawErrors.length > 0 ? 'invalid' : undefined}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...(textFieldProps as InputProps)}
      {...rangeProps}
    />
  )
}
