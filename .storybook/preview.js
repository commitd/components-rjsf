import { withTheme } from './committed/withTheme'
import { DocsContainer } from './components/DocsContainer'
import { committedDark, committedLight } from './committed/theme.js'

export const decorators = [withTheme]
export const parameters = {
  options: {
    storySort: {
      order: ['Introduction', 'Getting Started', 'Examples'],
    },
  },
  docs: {
    container: DocsContainer,
  },
  darkMode: {
    dark: committedDark,
    light: committedLight,
  },
}
