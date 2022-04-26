/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import {
  fireEvent,
  renderDark,
  renderLight,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/test-utils'
import {
  Additional,
  Default,
  DefaultLabels,
  NoOptionalLabels,
  RequiredLabels,
} from './FieldTemplate.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders DefaultLabels', async () => {
  renderLight(<DefaultLabels {...DefaultLabels.args} />)
  expect(await screen.findByText(/\(optional\)*/)).toBeInTheDocument()
})

it('renders RequiredLabels', async () => {
  renderLight(<RequiredLabels {...RequiredLabels.args} />)
  expect(await screen.findByText(/\*/)).toBeInTheDocument()
})

it('renders NoOptionalLabels', () => {
  renderLight(<NoOptionalLabels {...NoOptionalLabels.args} />)
  expect(screen.queryByText(/\(optional\)*/)).not.toBeInTheDocument()
  expect(screen.queryByText(/\*/)).not.toBeInTheDocument()
})

it('renders Additional', async () => {
  const onSubmit = jest.fn()
  renderLight(
    <Additional {...Additional.args} onSubmit={(e) => onSubmit(e.formData)} />
  )

  userEvent.click(screen.getByRole('button', { name: /add/i }))
  await waitFor(() => {
    expect(
      screen.getByRole('textbox', { name: /newKey Key/i })
    ).toBeInTheDocument()
  })
  const keyElement = screen.getByRole('textbox', { name: /newKey Key/i })
  userEvent.type(keyElement, 'test')

  const valueElement = screen.getByRole('textbox', {
    name: /newKey \(optional\)/i,
  })
  fireEvent.change(valueElement, { target: { value: 'value' } })

  userEvent.type(
    screen.getByRole('textbox', { name: /first\s?name/i }),
    'First name'
  )
  userEvent.type(
    screen.getByRole('textbox', { name: /last\s?name/i }),
    'Last name'
  )

  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(onSubmit).toHaveBeenCalledWith({
    firstName: 'First name',
    lastName: 'Last name',
    newKeytest: 'value',
  })
})
