import React from 'react'
import { renderDark, renderLight } from '../../../utils/test-utils'
import { Default } from './TextWidget.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default {...Default.args} />)
  expect(asFragment()).toBeDefined()
})
