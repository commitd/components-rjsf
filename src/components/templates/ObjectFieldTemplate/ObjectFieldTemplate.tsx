import { Box, Column, Row } from '@committed/components'
import { ObjectFieldTemplateProps, utils } from '@rjsf/core'
import React from 'react'
import { IconButton } from '../../../utils'

const { canExpand } = utils

export const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  DescriptionField,
  description,
  TitleField,
  title,
  properties,
  required,
  disabled,
  readonly,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
}) => {
  return (
    <fieldset id={idSchema.$id}>
      {(uiSchema['ui:title'] || title) && (
        <>
          <Row css={{ gap: '$1', mb: '$3' }}>
            <TitleField
              id={`${idSchema.$id}-title`}
              title={title}
              required={required}
            />
            {description && (
              <DescriptionField
                id={`${idSchema.$id}-description`}
                description={description}
              />
            )}
          </Row>
        </>
      )}
      <Column>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {properties.map((element: any, index: number) => {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
          return <Box key={index}>{element.content}</Box>
        })}
        {canExpand(schema, uiSchema, formData) && (
          <Row css={{ justifyContent: 'flex-end' }}>
            <IconButton
              icon="plus"
              onClick={onAddClick(schema)}
              disabled={disabled || readonly}
            />
          </Row>
        )}
      </Column>
    </fieldset>
  )
}
