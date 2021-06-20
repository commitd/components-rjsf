/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectItem } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import React, { ChangeEvent, ComponentProps, FC, FocusEvent } from 'react'
const { getDisplayLabel, asNumber, guessType } = utils

type SelectProps = ComponentProps<typeof Select>

export type SelectWidgetProps = WidgetProps &
  Pick<SelectProps, Exclude<keyof SelectProps, 'onBlur' | 'onFocus'>>

function getSelectType(baseType: string) {
  if (baseType === 'string') {
    return 'text'
  }
  if (baseType === 'integer') {
    return 'number'
  }
  return baseType
}

const nums = new Set(['number', 'integer'])

const processValue = (schema: any, value: any) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema
  if (value === '') {
    return undefined
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber)
  } else if (type === 'boolean') {
    return value === 'true'
  } else if (type === 'number') {
    return asNumber(value)
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x: any) => guessType(x) === 'number')) {
      return asNumber(value)
    } else if (schema.enum.every((x: any) => guessType(x) === 'boolean')) {
      return value === 'true'
    }
  }

  return value
}

export const SelectWidget: FC<SelectWidgetProps> = ({
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
  multiple,
  rawErrors = [],
  // Extract and ignore these props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autofocus,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formContext,
  ...textFieldProps
}: SelectWidgetProps) => {
  const { enumOptions, enumDisabled } = options

  const _onChange = (value: string) => onChange(processValue(schema, value))

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onBlur(id, processValue(schema, value))

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onFocus(id, processValue(schema, value))

  const displayLabel = getDisplayLabel(schema, uiSchema)
  const SelectType = getSelectType(type || schema.type)

  return (
    <Select
      id={id}
      placeholder={placeholder}
      label={displayLabel ? label || schema.title : false}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      type={SelectType}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value || value?.value || ''}
      state={rawErrors.length > 0 ? 'invalid' : undefined}
      onValueChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...(textFieldProps as SelectProps)}
    >
      {(enumOptions as any).map(({ value, label }: any, i: number) => {
        const disabled: any =
          enumDisabled && (enumDisabled as any).indexOf(value) != -1
        return (
          <SelectItem key={i} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        )
      })}
    </Select>
  )
}
