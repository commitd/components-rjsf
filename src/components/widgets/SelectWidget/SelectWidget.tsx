/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Select, SelectItem } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { ComponentProps, FC, FocusEvent, useLayoutEffect } from 'react'
import { asBoolean, asNumber } from '../../../utils'

const { guessType } = utils

type SelectProps<C = ComponentProps<typeof Select>> = Pick<
  C,
  Exclude<keyof C, 'onBlur' | 'onFocus' | 'defaultValue' | 'dir' | 'css'>
>

export type SelectWidgetProps = WidgetProps & SelectProps

const nums = new Set(['number', 'integer'])

const processValue = (schema: JSONSchema7, value: unknown) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema
  if (value === undefined || value === '') {
    return undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-argument
  }
  if (type === 'array') {
    const arrayValue = Array.isArray(value) ? value : [value]
    if (items && nums.has((items as JSONSchema7).type as string)) {
      return arrayValue.map(asNumber)
    } else {
      return arrayValue
    }
  }
  if (type === 'boolean') {
    return asBoolean(value as string | boolean | undefined)
  }
  if (type === 'number') {
    return asNumber(value as string | number | undefined)
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x: any) => guessType(x) === 'number')) {
      return asNumber(value as string)
    } else if (schema.enum.every((x: any) => guessType(x) === 'boolean')) {
      return value === 'true'
    }
  }

  return value
}

type OptionsArray = Array<{ value: any; label: string }>

function getValue(_schema: JSONSchema7, value: unknown) {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

function isEmptyArray(value: unknown) {
  return Array.isArray(value) && value.length === 0
}

function isEmptyValue(schema: JSONSchema7, value: unknown) {
  if (value === undefined) {
    return true
  }
  return schema.type === 'array' && isEmptyArray(value)
}

export const SelectWidget: FC<SelectWidgetProps> = ({
  id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder: _placeholder,
  required,
  readonly,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
  rawErrors = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label: _label,
  ...selectProps
}: SelectWidgetProps) => {
  const { enumOptions, enumDisabled } = options
  // A select should have a default value to work properly
  // So we force one on first render if none is provided
  useLayoutEffect(() => {
    if (Array.isArray(enumOptions) && isEmptyValue(schema, value)) {
      for (const option of enumOptions) {
        const { value: possible } = option
        if (((enumDisabled || []) as any[]).indexOf(value) === -1) {
          onChange(processValue(schema, possible))
          break
        }
      }
    }
  }, [enumDisabled, enumOptions, onChange, schema, value])

  const _onChange = (value: string) => onChange(processValue(schema, value))

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onBlur(id, processValue(schema, value))

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onFocus(id, processValue(schema, value))

  const selectValue = getValue(schema, value)

  return (
    <Select
      id={id}
      required={required}
      disabled={disabled || readonly}
      value={selectValue}
      error={rawErrors.length > 0}
      onValueChange={_onChange}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore FIXME
      onBlur={_onBlur}
      onFocus={_onFocus}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
      {...selectProps}
    >
      {(enumOptions as OptionsArray).map(({ value, label }, i: number) => {
        const disabled: boolean =
          ((enumDisabled || []) as any[]).indexOf(value) != -1
        return (
          <SelectItem key={i} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        )
      })}
    </Select>
  )
}
