import { WidgetProps } from '@rjsf/core'
import React, {
  FC,
  useRef,
  ChangeEventHandler,
  useState,
  MouseEventHandler,
} from 'react'
import { Text, Box, Row, Button, Column } from '@committed/components'
import { TextWidget } from '../TextWidget'

// export const ColorWidget: FC<WidgetProps> = (props) => {
//   return <TextWidget {...props} type="color" />
// }

export const ColorWidget: FC<WidgetProps> = (props) => {
  const hiddenInput = useRef<HTMLInputElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { onChange, id, readonly, disabled, value } = props

  const isDisabled: boolean = readonly || disabled
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value)
  }

  const handleClick: MouseEventHandler<HTMLElement> = () => {
    hiddenInput?.current?.click()
  }

  return (
    <Column css={{ py: '$3', gap: '$2' }}>
      <Row css={{ gap: '$3' }}>
        <Box
          css={{
            cursor: isDisabled ? 'auto' : 'pointer',
            flexGrow: 1,
            minWidth: '40px',
            border: '1px solid',
            backgroundColor: (value || 'transparent') as string,
          }}
          onClick={handleClick}
        />
        <Button disabled={isDisabled} onClick={handleClick}>
          Choose Color
        </Button>
      </Row>
      <input
        ref={hiddenInput}
        id={id}
        type="color"
        value={value as string}
        disabled={isDisabled}
        onChange={handleChange}
        defaultValue=""
        style={{ display: 'none' }}
      />
    </Column>
  )
}
