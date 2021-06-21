import React, { FC } from 'react'
import { Paragraph, Text, Monospace, Box, Card } from '@committed/components'
import { FieldProps } from '@rjsf/core'

export const UnsupportedField: FC<FieldProps> = ({
  schema,
  idSchema,
  reason,
}) => (
  <div className="unsupported-field">
    <Paragraph>
      Unsupported field schema
      {idSchema && idSchema.$id && (
        <span>
          {' for'} field{' '}
          <Monospace css={{ background: '$background', color: '$error' }}>
            {idSchema.$id}
          </Monospace>
        </span>
      )}
      {reason && <Text italic>: {reason}</Text>}.
    </Paragraph>
    {schema && (
      <Card
        css={{
          width: '100%',
          backgroundColor: '$background',
          p: '$3',
        }}
        variant="outline"
      >
        <Monospace css={{ mx: 'auto' }}>
          {JSON.stringify(schema, null, 2)}
        </Monospace>
      </Card>
    )}
  </div>
)
