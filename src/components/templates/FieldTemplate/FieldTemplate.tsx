import {
  Box,
  FormControl as FormControlTemp,
  FormControlHelp,
  Input,
  Label,
  LabelOptional,
  Monospace,
  Row,
  styled,
} from '@committed/components'
import { FieldTemplateProps, utils } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { useMemo } from 'react'
import { IconButton, REQUIRED_FIELD_SYMBOL } from '../../../utils'

const { ADDITIONAL_PROPERTY_FLAG } = utils

/* FIXME should be able to remove this css https://github.com/commitd/components/issues/267*/
const FormControl = styled(FormControlTemp, { display: 'flex' })

const FieldLabel: React.FC<{
  id: string
  label?: string
  required?: boolean
  optional?: boolean
}> = ({ label, required = false, optional = false, id }) => {
  if (!label) {
    return null
  }
  return (
    <Label htmlFor={id}>
      {label}
      {optional && <LabelOptional />}
      {required && (
        <Monospace size={-1} css={{ color: '$error', verticalAlign: 'super' }}>
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
  onDropPropertyClick: (index: string) => (event?: React.MouseEvent) => void
  onKeyChange: (index: string) => void
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

  const handleBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onKeyChange(value)

  return (
    <Row gap css={{ alignItems: 'flex-end' }} key={`${id}-key`}>
      <Box variant="grow">
        <Input
          id={`${id}-key`}
          label={keyLabel}
          defaultValue={label}
          disabled={disabled || readonly}
          name={`${id}-key`}
          onBlur={!readonly ? handleBlur : undefined}
          type="text"
        />
      </Box>
      <Box variant="grow">{children}</Box>
      <IconButton
        icon="remove"
        tabIndex={-1}
        disabled={disabled || readonly}
        onClick={onDropPropertyClick(label)}
      />
    </Row>
  )
}

export const FieldTemplate: React.FC<FieldTemplateProps> = ({
  id,
  children,
  classNames,
  disabled,
  displayLabel,
  description,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  rawErrors = [],
  rawHelp,
  schema,
  formContext,
}) => {
  const { showRequired, showOptional } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (formContext?.showRequired === true) {
      return { showRequired: required, showOptional: false }
    }
    if (formContext?.showOptional === false) {
      return { showRequired: false, showOptional: false }
    } else {
      return { showRequired: false, showOptional: !required }
    }
  }, [formContext, required])

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
      <FormControl>
        {displayLabel && (
          <Row css={{ gap: '$2' }}>
            <FieldLabel
              id={id}
              label={label}
              required={showRequired}
              optional={showOptional}
            />
            {description}
          </Row>
        )}
        {children}
        <FormControlHelp
          defaultText={rawHelp ?? ''}
          errorText={rawErrors?.join(', ')}
        />
      </FormControl>
    </WrapIfAdditional>
  )
}
