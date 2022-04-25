import { TextArea } from '@committed/components'
import { WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'

type TextAreaProps<C = ComponentProps<typeof TextArea>> = Pick<
  C,
  Exclude<keyof C, 'onBlur' | 'onFocus' | 'css'>
>
export type TextareaWidgetProps = WidgetProps & TextAreaProps

export const TextareaWidget: FC<TextareaWidgetProps> = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,

  value,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  options,
  rawErrors = [],
  // Extract and ignore these props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uiSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formContext,
  ...textFieldProps
}: TextareaWidgetProps) => {
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(value === '' ? options.emptyValue : value)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onBlur(id, value)

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onFocus(id, value)

  const rows = typeof options.rows === 'number' ? options.rows : 0

  return (
    <TextArea
      id={id}
      css={{ height: rows > 2 ? `${rows * 24}px` : '$8', resize: 'vertical' }}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value || value === 0 ? value : ''}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...(textFieldProps as TextAreaProps)}
    />
  )
}
