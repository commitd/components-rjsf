import { Box, Button, Column, Row } from '@committed/components'
import { WidgetProps } from '@rjsf/core'
import React, { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react'

export const ColorWidget: FC<WidgetProps> = (props) => {
  const hiddenInput = useRef<HTMLInputElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { onChange, id, readonly, disabled, value, onFocus, onBlur } = props

  const isDisabled: boolean = readonly || disabled
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value)
    onBlur(id, event.target.value)
  }

  const handleClick: MouseEventHandler<HTMLElement> = () => {
    hiddenInput?.current?.click()
    onFocus(id, value)
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
        style={{ display: 'none' }}
      />
    </Column>
  )
}
