import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import fs from 'fs'
import path from 'path'
export { createPages } from './src/lib/createPages'

const modules = fs.readdirSync(path.join(__dirname, 'src')).map(value => {
  return path.basename(value, path.extname(value))
})

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      alias: modules.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: path.resolve(__dirname, `src/${cur}`),
        }),
        {},
      ),
    },
  })
}
