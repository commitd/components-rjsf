import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
} from '../../../utils/test-utils'
import { Default } from './ErrorList.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
  userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(screen.queryByText('Errors')).toBeInTheDocument()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})
