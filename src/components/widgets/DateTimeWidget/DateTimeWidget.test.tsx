import React from 'react'
import { renderLight, renderDark } from '../../../utils/test-utils'
import { Default } from './DateTimeWidget.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})
