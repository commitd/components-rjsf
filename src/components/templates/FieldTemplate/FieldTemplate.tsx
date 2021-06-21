import {
  Box,
  Column,
  Grid,
  Input,
  Label,
  Monospace,
  Row,
  Text,
} from '@committed/components'
import { FieldTemplateProps, utils } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { IconButton, REQUIRED_FIELD_SYMBOL } from '../../../utils'

const { ADDITIONAL_PROPERTY_FLAG } = utils

const FieldLabel: React.FC<{ label?: string; required?: boolean; id: string }> =
  ({ label, required, id }) => {
    if (!label) {
      return null
    }
    return (
      <Label htmlFor={id}>
        {label}
        {required && (
          <Monospace
            size={-1}
            css={{ color: '$error', verticalAlign: 'super' }}
          >
            {REQUIRED_FIELD_SYMBOL}
          </Monospace>
        )}
      </Label>
    )
  }

type WrapIfAdditionalProps = {
  children: React.ReactElement
  classNames: string
  disabled: boolean
  id: string
  label: string
  onDropPropertyClick: (index: string) => (event?: any) => void
  onKeyChange: (index: string) => (event?: any) => void
  readonly: boolean
  required: boolean
  schema: JSONSchema7
}

const WrapIfAdditional = ({
  children,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  schema,
}: WrapIfAdditionalProps) => {
  const keyLabel = `${label} Key`
  const additional = Object.prototype.hasOwnProperty.call(
    schema,
    ADDITIONAL_PROPERTY_FLAG
  )

  if (!additional) {
    return <>{children}</>
  }

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onKeyChange(target.value)

  return (
    <Row css={{ gap: '$3', alignItems: 'flex-end' }} key={`${id}-key`}>
      <Column css={{ flex: '1', gap: '$1', mb: '$4' }}>
        <Label htmlFor={id}>{keyLabel}</Label>
        <Input
          id={`${id}-key`}
          defaultValue={label}
          disabled={disabled || readonly}
          name={`${id}-key`}
          onBlur={!readonly ? handleBlur : undefined}
          type="text"
        />
      </Column>
      <Box css={{ flex: '1' }}>{children}</Box>
      <Box css={{ mb: '$5' }}>
        <IconButton
          icon="remove"
          tabIndex={-1}
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
        />
      </Box>
    </Row>
  )
}

export const FieldTemplate: React.FC<FieldTemplateProps> = ({
  id,
  children,
  classNames,
  disabled,
  label,
  description,
  displayLabel,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  rawErrors = [],
  rawHelp,
  schema,
}) => {
  return (
    <WrapIfAdditional
      classNames={classNames}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
    >
      <Column css={{ gap: '$1', mb: '$4' }}>
        {displayLabel && (
          <Row css={{ gap: '$2' }}>
            <FieldLabel id={id} label={label} required={required} />
            {description}
          </Row>
        )}

        {children}
        {rawErrors.length > 0 && (
          <Column css={{ gap: '$1' }}>
            {rawErrors.map((error, i: number) => {
              return (
                <Text
                  css={{ color: '$error' }}
                  key={`error-${i}`}
                  id={id}
                  size={-1}
                >
                  {error}
                </Text>
              )
            })}
          </Column>
        )}
        {rawHelp && (
          <Text id={id} size={-1}>
            {rawHelp}
          </Text>
        )}
      </Column>
    </WrapIfAdditional>
  )
}
