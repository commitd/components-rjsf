/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Type } from '@sinclair/typebox'
import React from 'react'
import { renderLight, screen, userEvent } from '../../utils/test-utils'
import { Default } from './JSFormDialog.stories'

it('renders and can submit', () => {
  const onSubmit = jest.fn()
  const setOpen = jest.fn()
  const { asFragment } = renderLight(
    <Default
      open={true}
      onOpenChange={setOpen}
      schema={Type.String()}
      onSubmit={onSubmit}
    />
  )
  expect(asFragment()).toBeDefined()

  userEvent.type(screen.getByRole('textbox'), 'test')
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalled()
})

it('renders and can cancel', () => {
  const onSubmit = jest.fn()
  const setOpen = jest.fn()
  renderLight(
    <Default
      open={true}
      onOpenChange={setOpen}
      schema={Type.String()}
      onSubmit={onSubmit}
    />
  )

  userEvent.type(screen.getByRole('textbox'), 'test')
  userEvent.click(screen.getByRole('button', { name: /cancel/i }))
  expect(onSubmit).not.toHaveBeenCalled()
})

it('renders and can open', () => {
  const onSubmit = jest.fn()
  renderLight(<Default schema={Type.String()} onSubmit={onSubmit} />)

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  userEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(onSubmit).not.toHaveBeenCalled()
})
