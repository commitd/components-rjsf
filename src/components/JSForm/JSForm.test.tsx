/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import { Type } from '@sinclair/typebox'
import {
  renderLight,
  renderDark,
  screen,
  userEvent,
} from '../../utils/test-utils'
import { Default } from './JSForm.stories'

it('renders light without error', () => {
  const onSubmit = jest.fn()
  const { asFragment } = renderLight(
    <Default schema={Type.String()} onSubmit={(e) => onSubmit(e.formData)} />
  )
  expect(asFragment()).toBeDefined()

  userEvent.type(screen.getByRole('textbox'), 'test')
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith('test')
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default schema={Type.String()} />)
  expect(asFragment()).toBeDefined()
})
