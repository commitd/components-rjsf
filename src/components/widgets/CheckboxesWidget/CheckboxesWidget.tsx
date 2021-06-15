import React, { ChangeEvent, FC, FocusEvent } from 'react'
import { Label, Checkbox, Flex } from '@committed/components'
import { WidgetProps } from '@rjsf/core'

interface Option {
  label: string
  value: string
}

function isOptions(enumOptions: unknown): enumOptions is Option[] {
  return Array.isArray(enumOptions)
}

const selectValue = (value: string, selected: string[], all: string[]) => {
  const at = all.indexOf(value)
  const updated = selected.slice(0, at).concat(value, selected.slice(at))
  return updated.sort((a, b) => (all.indexOf(a) > all.indexOf(b) ? 1 : -1))
}

const deselectValue = (value: string, selected: string[]): string[] => {
  return selected.filter((v) => v !== value)
}

export const CheckboxesWidget: FC<WidgetProps> = ({
  schema,
  label,
  id,
  disabled,
  options,
  value,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
  // Extract and ignore these props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autofocus,
}) => {
  const { enumOptions, enumDisabled, inline } = options

  if (!isOptions(enumOptions)) {
    throw new Error('Enum options is not an array')
  }

  const _onChange =
    (option: Option) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      const all = enumOptions.map(({ value }) => value)

      if (checked) {
        onChange(selectValue(option.value, value, all))
      } else {
        onChange(deselectValue(option.value, value))
      }
    }

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, value)
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, value)

  return (
    <>
      <Label required={required} htmlFor={id}>
        {label || schema.title}
      </Label>
      <Flex
        css={{
          flexDirection: inline ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: '$2',
          mt: '$3',
        }}
      >
        {enumOptions.map((option: Option, index: number) => {
          const checked = (value as string[]).indexOf(option.value) !== -1
          const itemDisabled =
            enumDisabled &&
            (enumDisabled as string[]).indexOf(option.value) != -1
          return (
            <Checkbox
              key={index}
              label={option.label}
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              onCheckedChange={_onChange(option)}
              onBlur={_onBlur}
              onFocus={_onFocus}
            />
          )
        })}
      </Flex>
    </>
  )
}
