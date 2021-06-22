/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { Default } from './CheckboxesWidget.stories'

it('renders light without error', () => {
  const onSubmit = jest.fn()
  renderLight(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  userEvent.click(screen.getByRole('checkbox', { name: /foo/i }))
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith(['foo'])
})

it('renders dark without error', () => {
  const onSubmit = jest.fn()
  renderDark(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  userEvent.click(screen.getByRole('checkbox', { name: /foo/i }))
  userEvent.click(screen.getByRole('checkbox', { name: /bar/i }))
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith(['foo', 'bar'])
})
