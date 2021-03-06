import { Box, Divider, Row, styled } from '@committed/components'
import { ObjectFieldTemplateProps, utils } from '@rjsf/core'
import React from 'react'
import { Fieldset, IconButton } from '../../../utils'

const { canExpand } = utils

const ObjectDivider = styled(Divider, {
  width: '100%',
  mt: '0 !important',
})

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
    <Fieldset id={idSchema.$id}>
      {(uiSchema['ui:title'] || title) && (
        <>
          <Row css={{ gap: '$1' }}>
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
          <ObjectDivider />
        </>
      )}
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
            aria-label="Add"
          />
        </Row>
      )}
    </Fieldset>
  )
}
