import { Box, Divider, Row, styled } from '@committed/components'
import { ArrayFieldTemplateProps, IdSchema, utils } from '@rjsf/core'
import React from 'react'
import { Fieldset, IconButton } from '../../../utils'

const { isMultiSelect, getDefaultRegistry } = utils

const ArrayDivider = styled(Divider, {
  width: '100%',
  mt: '0 !important',
})

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
    <Row key={key} css={{ gap: '$2' }}>
      <Box variant="grow">{children}</Box>
      {hasToolbar && (
        <Row css={{ alignItems: 'end' }}>
          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon="arrow-up"
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)}
            />
          )}

          {(hasMoveUp || hasMoveDown) && (
            <IconButton
              icon="arrow-down"
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index + 1)}
            />
          )}

          {hasRemove && (
            <IconButton
              icon="remove"
              destructive
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
    <>
      <Fieldset>
        <div>
          <Row gap>
            <ArrayFieldTitle
              key={`array-field-title-${idSchema.$id}`}
              TitleField={TitleField}
              idSchema={idSchema}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              title={uiSchema['ui:title'] || title}
              required={required}
            />
            {(uiSchema['ui:description'] || schema.description) && (
              <ArrayFieldDescription
                key={`array-field-description-${idSchema.$id}`}
                DescriptionField={DescriptionField}
                idSchema={idSchema}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                description={uiSchema['ui:description'] || schema.description}
              />
            )}
          </Row>
          <ArrayDivider />
        </div>

        {items && items.map(DefaultArrayItem)}

        {canAdd && (
          <IconButton
            icon="plus"
            onClick={onAddClick}
            disabled={disabled || readonly}
          />
        )}
      </Fieldset>
    </>
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
    <Fieldset>
      <div>
        <Row gap>
          <ArrayFieldTitle
            // key={`array-field-title-${idSchema.$id}`}
            TitleField={TitleField}
            idSchema={idSchema}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            title={uiSchema['ui:title'] || title}
            required={required}
          />
          {(uiSchema['ui:description'] || schema.description) && (
            <ArrayFieldDescription
              // key={`array-field-description-${idSchema.$id}`}
              DescriptionField={DescriptionField}
              idSchema={idSchema}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              description={uiSchema['ui:description'] || schema.description}
            />
          )}
        </Row>
        <ArrayDivider />
      </div>

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
    </Fieldset>
  )
}

export const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (
  props
) => {
  const { schema, registry = getDefaultRegistry() } = props

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
  if (isMultiSelect(schema, registry.rootSchema)) {
    return <DefaultFixedArrayFieldTemplate {...props} />
  } else {
    return <DefaultNormalArrayFieldTemplate {...props} />
  }
}
