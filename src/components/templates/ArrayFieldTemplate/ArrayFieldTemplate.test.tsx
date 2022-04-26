/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { AllOf, AnyOf, Default, OneOf } from './ArrayFieldTemplate.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders AllOf', () => {
  const onSubmit = jest.fn()
  renderLight(<AllOf {...AllOf.args} onSubmit={(e) => onSubmit(e.formData)} />)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ lorem: true })
})

it('renders OneOf', () => {
  const onSubmit = jest.fn()
  renderLight(<OneOf {...OneOf.args} onSubmit={(e) => onSubmit(e.formData)} />)
  userEvent.type(screen.getByRole('textbox', { name: /lorem/i }), 'ipsum')
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ lorem: 'ipsum' })
})

it('renders AnyOf', () => {
  const onSubmit = jest.fn()
  renderLight(<AnyOf {...AnyOf.args} onSubmit={(e) => onSubmit(e.formData)} />)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({ firstName: 'Chuck' })
})
