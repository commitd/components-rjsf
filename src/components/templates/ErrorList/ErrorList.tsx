import { Alert, AlertContent, AlertTitle, Text } from '@committed/components'
import { ErrorListProps } from '@rjsf/core'
import React from 'react'

export const ErrorList: React.FC<ErrorListProps> = ({ errors }) => (
  <Alert severity="error">
    <AlertTitle>Errors</AlertTitle>
    <AlertContent>
      <ul>
        {errors.map((error, i: number) => {
          return (
            <li key={`error_${i}`}>
              <Text>{error.stack}</Text>
            </li>
          )
        })}
      </ul>
    </AlertContent>
  </Alert>
)
