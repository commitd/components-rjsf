import { Checkbox, CheckedState, Monospace } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { FC, FocusEvent } from 'react'
import { REQUIRED_FIELD_SYMBOL } from '../../../utils'
const { schemaRequiresTrueValue } = utils

export const CheckboxWidget: FC<WidgetProps> = ({
  schema,
  id,
  value,
  autofocus,
  disabled,
  readonly,
  label,
  required,
  onChange,
  onBlur,
  onFocus,
}) => {
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  const schemaRequired = schemaRequiresTrueValue(schema)

  const _onChange = (checked: CheckedState) => onChange(checked)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, value)

  const fullLabel = (
    <span>
      {label}
      {required && (
        <Monospace size={-1} css={{ color: '$error', verticalAlign: 'super' }}>
          {REQUIRED_FIELD_SYMBOL}
        </Monospace>
      )}
    </span>
  )

  return (
    <Checkbox
      id={id}
      label={fullLabel}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      checked={typeof value === 'undefined' ? false : value}
      required={schemaRequired}
      disabled={disabled || readonly}
      onCheckedChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
    />
  )
}
