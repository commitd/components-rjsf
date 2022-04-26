import { Input } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'
const { rangeSpec } = utils

type InputProps<C = ComponentProps<typeof Input>> = Pick<
  C,
  Exclude<keyof C, 'onChange' | 'onBlur' | 'onFocus' | 'css'>
>

export type TextWidgetProps = WidgetProps & InputProps

function getInputType(
  baseType: string | string[]
): React.HTMLInputTypeAttribute {
  if (Array.isArray(baseType)) {
    return getInputType(baseType[0])
  }
  if (baseType === 'string') {
    return 'text'
  }
  if (baseType === 'integer') {
    return 'number'
  }
  return baseType as React.HTMLInputTypeAttribute
}

export const TextWidget: FC<TextWidgetProps> = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  autofocus,
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
  label: _label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiSchema: _uiSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formContext: _formContext,
  ...textFieldProps
}: TextWidgetProps) => {
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(value === '' ? options.emptyValue : value)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  const inputType = getInputType(type ?? schema.type ?? 'string')

  const rangeProps = inputType === 'number' ? { ...rangeSpec(schema) } : {}

  return (
    <Input
      id={id}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
      type={inputType}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value || value === 0 ? value : ''}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...(textFieldProps as InputProps)}
      {...rangeProps}
    />
  )
}
