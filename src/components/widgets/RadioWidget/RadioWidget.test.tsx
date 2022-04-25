/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  getByRole,
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { Default } from './RadioWidget.stories'

it('renders light without error', () => {
  const onSubmit = jest.fn()
  renderLight(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  userEvent.click(
    getByRole(screen.getByRole('label', { name: /SVG/i }), 'radio')
  )
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ format: 'svg' })
})

it('renders dark without error', () => {
  const onSubmit = jest.fn()
  renderDark(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  userEvent.click(
    getByRole(screen.getByRole('label', { name: /SVG/i }), 'radio')
  )
  userEvent.click(
    getByRole(screen.getByRole('label', { name: /JPG/i }), 'radio')
  )
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ format: 'jpg' })
})
