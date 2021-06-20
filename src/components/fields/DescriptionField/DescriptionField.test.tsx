import React from 'react'
import { renderDark, renderLight } from '../../../utils/test-utils'
import { Default } from './DescriptionField.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default />)
  expect(asFragment()).toBeDefined()
})
