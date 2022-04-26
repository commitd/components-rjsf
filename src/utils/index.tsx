import { IconButton as CIconButton, styled } from '@committed/components'
import {
  mdiArrowDownBold,
  mdiArrowUpBold,
  mdiMinusThick,
  mdiPlusThick,
} from '@mdi/js'
import { utils } from '@rjsf/core'
import React from 'react'

export interface Option {
  label: string
  value: string
}

export function isOptions(enumOptions: unknown): enumOptions is Option[] {
  return Array.isArray(enumOptions)
}

export function asNumber(
  value: string | number | undefined
): number | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? value : (utils.asNumber(value) as number)
}
export function asBoolean(
  value: string | boolean | undefined
): boolean | undefined {
  if (value === undefined) return undefined
  return typeof value === 'boolean' ? value : value === 'true'
}

export const REQUIRED_FIELD_SYMBOL = '*'

const mappings: Record<string, string> = {
  remove: mdiMinusThick,
  plus: mdiPlusThick,
  'arrow-up': mdiArrowUpBold,
  'arrow-down': mdiArrowDownBold,
}

type IconButtonProps = React.ComponentProps<typeof CIconButton> & {
  icon: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ...otherProps
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const path = mappings[icon]
  return (
    <CIconButton
      path={path}
      size="large"
      variant="tertiary"
      tabIndex={-1}
      {...otherProps}
    />
  )
}

export const Fieldset = styled('fieldset', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  '& ~ .panel': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
  },
})
