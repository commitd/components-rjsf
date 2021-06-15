import React from 'react'
import { Type } from '@sinclair/typebox'
import { renderLight, renderDark } from '../../utils/test-utils'
import { Default } from './JSForm.stories'

it('renders light without error', () => {
  const { asFragment } = renderLight(<Default schema={Type.String()} />)
  expect(asFragment()).toBeDefined()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Default schema={Type.String()} />)
  expect(asFragment()).toBeDefined()
})
