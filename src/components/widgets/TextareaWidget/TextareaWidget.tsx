import { CSS, TextArea } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'
const { getDisplayLabel } = utils

type TextAreaProps = ComponentProps<typeof TextArea>

export type TextareaWidgetProps = WidgetProps &
  Pick<TextAreaProps, Exclude<keyof TextAreaProps, 'onBlur' | 'onFocus'>>

function getInputType(baseType: string) {
  if (baseType === 'string') {
    return 'text'
  }
  return baseType
}

export const TextareaWidget: FC<TextareaWidgetProps> = ({
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
}: TextareaWidgetProps) => {
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(value === '' ? options.emptyValue : value)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, value)

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value)

  const displayLabel = getDisplayLabel(schema, uiSchema)
  const inputType = getInputType(type || schema.type)

  const css: CSS = {
    height: '$8',
  }
  const rows = options.rows
  if (typeof rows === 'number' && rows > 2) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    css.height = `${rows * 24}px`
  }

  return (
    <TextArea
      id={id}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      css={css}
      placeholder={placeholder}
      label={displayLabel ? label || schema.title : false}
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
      {...(textFieldProps as TextAreaProps)}
    />
  )
}
