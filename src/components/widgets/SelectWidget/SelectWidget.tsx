/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Select, SelectItem } from '@committed/components'
import { utils, WidgetProps } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { ComponentProps, FC, FocusEvent } from 'react'

const { asNumber, guessType } = utils

type SelectProps = ComponentProps<typeof Select>

export type SelectWidgetProps = WidgetProps &
  Pick<SelectProps, Exclude<keyof SelectProps, 'onBlur' | 'onFocus'>>

const nums = new Set(['number', 'integer'])

const processValue = (schema: JSONSchema7, value: any) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema
  if (value === '') {
    return undefined
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber)
  } else if (type === 'boolean') {
    return value
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

type OptionsArray = Array<{ value: any; label: string }>

function getValue(options: OptionsArray, value: any): string {
  const found = options.find((a) => value === a.value)
  if (found) {
    return found.label || found.value
  } else return ''
}

export const SelectWidget: FC<SelectWidgetProps> = ({
  id,
  placeholder,
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
}: SelectWidgetProps) => {
  const { enumOptions, enumDisabled } = options

  const _onChange = (value: string) => onChange(processValue(schema, value))

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onBlur(id, processValue(schema, value))

  const _onFocus = ({ target: { value } }: FocusEvent<HTMLSelectElement>) =>
    onFocus(id, processValue(schema, value))

  const selectValue = getValue(enumOptions as OptionsArray, value)

  return (
    <Select
      id={id}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      type="text"
      value={selectValue}
      state={rawErrors.length > 0 ? 'invalid' : undefined}
      onValueChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autofocus}
    >
      {(enumOptions as any).map(({ value, label }: any, i: number) => {
        const disabled: boolean =
          ((enumDisabled || []) as string[]).indexOf(value) != -1
        return (
          <SelectItem key={i} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        )
      })}
    </Select>
  )
}
