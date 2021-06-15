import React from 'react'
import { renderLight, renderDark } from '../../utils/test-utils'
import { Default } from './CheckboxWidget.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default />)
  expect(asFragment()).toBeDefined()
})
