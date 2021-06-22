import React from 'react'
import { renderDark, renderLight } from '../../../utils/test-utils'
import { Default } from './SelectWidget.stories'

// NOTE cannot test Select properly as we get a DOMRect is not defined error
it('renders light without error', () => {
  const { asFragment } = renderLight(<Default />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default />)
  expect(asFragment()).toBeDefined()
})
