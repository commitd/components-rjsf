import { Checkbox, CheckedState } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { FC, FocusEvent } from 'react'
const { schemaRequiresTrueValue } = utils

export const CheckboxWidget: FC<WidgetProps> = ({
  schema,
  id,
  value,
  autofocus,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
}) => {
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords. Then if false set undefined to stop the optional marker.
  const schemaRequired = schemaRequiresTrueValue(schema) || undefined

  const _onChange = (checked: CheckedState) => onChange(checked)

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, value)

  return (
    <Checkbox
      id={id}
      label={label}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      checked={typeof value === 'undefined' ? false : value}
      required={schemaRequired}
      disabled={disabled || readonly}
      onCheckedChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      error={rawErrors.length > 0}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
    />
  )
}
