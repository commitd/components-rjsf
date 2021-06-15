import { Input } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'
const { getDisplayLabel } = utils

type InputProps = ComponentProps<typeof Input>

export type TextWidgetProps = WidgetProps &
  Pick<InputProps, Exclude<keyof InputProps, 'onBlur' | 'onFocus'>>

export const TextWidget: FC<TextWidgetProps> = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  options,
  schema,
  uiSchema,
  rawErrors = [],
  // Extract and ignore these props
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

  const displayLabel = getDisplayLabel(schema, uiSchema)
  const inputType =
    (type || schema.type) === 'string' ? 'text' : `${type || schema.type}`

  return (
    <Input
      id={id}
      placeholder={placeholder}
      label={displayLabel ? label || schema.title : false}
      required={required}
      disabled={disabled}
      readonly={readonly}
      type={inputType}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value || value === 0 ? value : ''}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...(textFieldProps as InputProps)}
    />
  )
}
