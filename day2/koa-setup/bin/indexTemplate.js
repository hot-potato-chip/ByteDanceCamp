import ejs from 'ejs'
import fs from 'fs'
import prettier from 'prettier'

export function createIndexTemplate(config) {
  const template = fs.readFileSync('./template/index.ejs','utf-8')
  const code = ejs.render(template,{
    port: config.port,
    router:config.middleware.router,
    static:config.middleware.static,
  })
  return prettier.format(code,{
    parser: 'babel'
  })
}