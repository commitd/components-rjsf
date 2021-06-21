import { Type } from '@sinclair/typebox'
import { Meta } from '@storybook/react'
import { FileWidget } from '.'
import { DefaultStory } from '../../../utils/utils.stories'

export default {
  title: 'Widgets/FileWidget',
  component: FileWidget,
} as Meta

export const Default = DefaultStory.bind({})
Default.args = {
  schema: Type.Object({
    file: Type.String({
      title: 'File',
      description: 'description',
      format: 'data-url',
    }),
  }),
}

export const Files = DefaultStory.bind({})
Files.args = {
  schema: Type.Object({
    files: Type.Array(
      Type.String({
        format: 'data-url',
      }),
      { title: 'Files', description: 'description' }
    ),
  }),
}
