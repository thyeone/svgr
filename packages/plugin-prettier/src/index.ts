import { format, resolveConfig } from 'prettier'
// @ts-ignore
import deepmerge from 'deepmerge'
import type { Plugin } from '@svgr/core'

const prettierPlugin: Plugin = (code, config, state) => {
  if (!config.prettier) return code
  const filePath = state.filePath || process.cwd()

  // prettier 설정을 가져올 때 plugins 제외
  const prettierRcConfig = config.runtimeConfig
    ? {
        ...resolveConfig.sync(filePath, { editorconfig: true }),
        plugins: [], // plugins 비우기
      }
    : {}

  // 최종 설정에서도 plugins 제외 보장
  const finalConfig = deepmerge.all([
    { parser: 'babel' },
    prettierRcConfig || {},
    {
      ...(config.prettierConfig || {}),
      plugins: [], // plugins 비우기
    },
  ])

  return format(code, finalConfig)
}

export default prettierPlugin
