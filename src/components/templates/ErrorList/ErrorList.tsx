import { Alert, AlertContent, AlertTitle } from '@committed/components'
import { ErrorListProps } from '@rjsf/core'
import React from 'react'

export const ErrorList: React.FC<ErrorListProps> = ({ errors }) => (
  <Alert css={{ mb: '$3' }} severity="error">
    <AlertTitle>Errors</AlertTitle>
    <AlertContent>
      <ul>
        {errors.map((error, i: number) => {
          return <li key={`error_${i}`}>{error.stack}</li>
        })}
      </ul>
    </AlertContent>
  </Alert>
)
