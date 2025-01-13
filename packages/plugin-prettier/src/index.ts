import { format, resolveConfig } from 'prettier'
// @ts-ignore
import deepmerge from 'deepmerge'
import type { Plugin } from '@svgr/core'

const prettierPlugin: Plugin = (code, config, state) => {
  if (!config.prettier) return code
  const filePath = state.filePath || process.cwd()

  const prettierRcConfig = config.runtimeConfig
    ? {
        ...resolveConfig.sync(filePath, { editorconfig: true }),
        plugins: [],
      }
    : {}

  const finalConfig = deepmerge.all([
    { parser: 'babel' },
    prettierRcConfig || {},
    {
      ...(config.prettierConfig || {}),
      plugins: [],
    },
  ])

  return format(code, finalConfig)
}

export default prettierPlugin
