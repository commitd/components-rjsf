/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { Default } from './CheckboxWidget.stories'

it('renders light without error', () => {
  const onSubmit = jest.fn()
  const { asFragment } = renderLight(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  expect(asFragment()).toBeDefined()
  userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }))
  userEvent.click(screen.getByRole('button'))
  expect(onSubmit).toHaveBeenCalledWith({ checkbox: true })
})

it('renders dark without error', () => {
  const onSubmit = jest.fn()
  const { asFragment } = renderDark(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  expect(asFragment()).toBeDefined()
  userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }))
  userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }))
  userEvent.click(screen.getByRole('button'))
  expect(onSubmit).toHaveBeenCalledWith({ checkbox: false })
})
