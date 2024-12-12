import { jstsConfig } from './js-ts.js'

import globals from 'globals'

export const serverConfig = [
  ...jstsConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
