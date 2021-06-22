/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { Default } from './TextareaWidget.stories'

it('renders light without error', () => {
  const onSubmit = jest.fn()
  renderLight(
    <Default {...Default.args} onSubmit={(e) => onSubmit(e.formData)} />
  )
  userEvent.type(screen.getByRole('textbox'), 'Testing')
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ textarea: 'Testing' })
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})
