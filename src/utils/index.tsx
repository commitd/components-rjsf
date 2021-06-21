import { CSS, IconButton as Button, Svg } from '@committed/components'
import {
  mdiArrowDownBold,
  mdiArrowUpBold,
  mdiMinusThick,
  mdiPlusThick,
} from '@mdi/js'
import React from 'react'

export interface Option {
  label: string
  value: string
}

export function isOptions(enumOptions: unknown): enumOptions is Option[] {
  return Array.isArray(enumOptions)
}

export const REQUIRED_FIELD_SYMBOL = '*'

const mappings: Record<string, string> = {
  remove: mdiMinusThick,
  plus: mdiPlusThick,
  'arrow-up': mdiArrowUpBold,
  'arrow-down': mdiArrowDownBold,
}

type IconButtonProps = React.ComponentProps<typeof Button> & {
  icon: string
  iconCss?: CSS
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconProps,
  ...otherProps
}: IconButtonProps) => {
  const path = mappings[icon]
  return (
    <Button {...otherProps}>
      <Svg path={path} {...iconProps} />
    </Button>
  )
}

export default IconButton
