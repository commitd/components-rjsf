import { Box, Column, Row } from '@committed/components'
import { ArrayFieldTemplateProps, IdSchema, utils } from '@rjsf/core'
import React from 'react'
import { IconButton } from '../../../utils'

const { isMultiSelect, getDefaultRegistry } = utils

export const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (
  props
) => {
  const { schema, registry = getDefaultRegistry() } = props

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isMultiSelect(schema, (registry as any).rootSchema)) {
    return <DefaultFixedArrayFieldTemplate {...props} />
  } else {
    return <DefaultNormalArrayFieldTemplate {...props} />
  }
}

type ArrayFieldTitleProps = {
  TitleField: React.JSXElementConstructor<{
    id: string
    title: string
    required: boolean
  }>
  idSchema: IdSchema
  title: string
  required: boolean
}

const ArrayFieldTitle: React.FC<ArrayFieldTitleProps> = ({
  TitleField,
  idSchema,
  title,
  required,
}) => {
  if (!title) {
    return null
  }

  const id = `${idSchema.$id}__title`
  return <TitleField id={id} title={title} required={required} />
}

type ArrayFieldDescriptionProps = {
  DescriptionField: React.JSXElementConstructor<{
    id: string
    description: string
  }>
  idSchema: IdSchema
  description: string
}

const ArrayFieldDescription = ({
  DescriptionField,
  idSchema,
  description,
}: ArrayFieldDescriptionProps) => {
  if (!description) {
    return null
  }

  const id = `${idSchema.$id}__description`
  return <DescriptionField id={id} description={description} />
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// Used in the two templates
const DefaultArrayItem: React.FC<
  ArrayElement<ArrayFieldTemplateProps['items']>
> = ({
  key,
  index,
  children,
  hasToolbar,
  hasMoveUp,
  hasMoveDown,
  hasRemove,
  disabled,
  readonly,
  onReorderClick,
  onDropIndexClick,
}) => {
  return (
    <Row key={key} css={{ gap: '$2', mb: '$2', justifyContent: 'center' }}>
      <Column style={{ overflow: 'auto', flex: '1' }}>
        <Box>{children}</Box>
      </Column>

      {hasToolbar && (
        <Row css={{ alignItems: 'center' }}>
          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon="arrow-up"
              tabIndex={-1}
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)}
            />
          )}

          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon="arrow-down"
              tabIndex={-1}
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index + 1)}
            />
          )}

          {hasRemove && (
            <IconButton
              icon="remove"
              tabIndex={-1}
              disabled={disabled || readonly}
              onClick={onDropIndexClick(index)}
            />
          )}
        </Row>
      )}
    </Row>
  )
}

const DefaultFixedArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
  className,
  idSchema,
  schema,
  uiSchema,
  title,
  required,
  items,
  canAdd,
  disabled,
  readonly,
  TitleField,
  DescriptionField,
  onAddClick,
}) => {
  return (
    <fieldset className={className}>
      <Row css={{ gap: '$2' }}>
        <ArrayFieldTitle
          key={`array-field-title-${idSchema.$id}`}
          TitleField={TitleField}
          idSchema={idSchema}
          title={uiSchema['ui:title'] || title}
          required={required}
        />
        {(uiSchema['ui:description'] || schema.description) && (
          <ArrayFieldDescription
            key={`array-field-description-${idSchema.$id}`}
            DescriptionField={DescriptionField}
            idSchema={idSchema}
            description={uiSchema['ui:description'] || schema.description}
          />
        )}
      </Row>

      <div
        className="row array-item-list"
        key={`array-item-list-${idSchema.$id}`}
      >
        {items && items.map(DefaultArrayItem)}
      </div>

      {canAdd && (
        <IconButton
          icon="plus"
          onClick={onAddClick}
          disabled={disabled || readonly}
        />
      )}
    </fieldset>
  )
}

const DefaultNormalArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
  idSchema,
  schema,
  uiSchema,
  title,
  required,
  items,
  canAdd,
  disabled,
  readonly,
  TitleField,
  DescriptionField,
  onAddClick,
}) => {
  return (
    <Column>
      <Row css={{ gap: '$2' }}>
        <ArrayFieldTitle
          key={`array-field-title-${idSchema.$id}`}
          TitleField={TitleField}
          idSchema={idSchema}
          title={uiSchema['ui:title'] || title}
          required={required}
        />
        {(uiSchema['ui:description'] || schema.description) && (
          <ArrayFieldDescription
            key={`array-field-description-${idSchema.$id}`}
            DescriptionField={DescriptionField}
            idSchema={idSchema}
            description={uiSchema['ui:description'] || schema.description}
          />
        )}
      </Row>
      <Column key={`array-item-list-${idSchema.$id}`}>
        {items && items.map((p) => DefaultArrayItem(p))}

        {canAdd && (
          <Row css={{ justifyContent: 'flex-end' }}>
            <IconButton
              icon="plus"
              onClick={onAddClick}
              disabled={disabled || readonly}
            />
          </Row>
        )}
      </Column>
    </Column>
  )
}
