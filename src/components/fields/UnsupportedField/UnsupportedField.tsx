import {
  Card,
  Column,
  Monospace,
  Paragraph,
  styled,
  Text,
} from '@committed/components'
import { FieldProps } from '@rjsf/core'
import React, { FC } from 'react'

const ErrorId = styled(Monospace, {
  background: '$background',
  color: '$error',
})

const ErrorJson = styled(Card, {
  width: '100%',
  backgroundColor: '$background',
  p: '$3',

  defaultVariants: {
    variant: 'outline',
  },
})

export const UnsupportedField: FC<FieldProps> = ({
  schema,
  idSchema,
  reason,
}) => (
  <Column>
    <Paragraph>
      Unsupported field schema
      {idSchema && idSchema.$id && (
        <span>
          {' for'} field <ErrorId inline>{idSchema.$id}</ErrorId>
        </span>
      )}
      {reason && <Text italic>: {reason}</Text>}.
    </Paragraph>
    {schema && (
      <ErrorJson>
        <Monospace>{JSON.stringify(schema, null, 2)}</Monospace>
      </ErrorJson>
    )}
  </Column>
)
