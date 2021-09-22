import ejs from 'ejs'
import fs from 'fs'
import prettier from 'prettier'
import { fileURLToPath } from 'url'
import path from 'path'

export function createIndexTemplate(config) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const template = fs.readFileSync(path.resolve(__dirname,'./template/index.ejs'),'utf-8')
  const code = ejs.render(template,{
    port: config.port,
    router:config.middleware.router,
    static:config.middleware.static,
  })
  return prettier.format(code,{
    parser: 'babel'
  })
}