import { serverConfig } from '@repo/eslint-config/server'
export default [
  ...serverConfig,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', 'package.json', 'node_modules/**'],
  },
]
