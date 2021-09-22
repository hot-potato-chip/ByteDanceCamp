#!/usr/bin/env node

import fs from "fs"
import { createConfig } from "./config.js"
import { createIndexTemplate } from "./indexTemplate.js"
import { createPackageTemplate } from "./packageTemplate.js"
import { question } from "./question/index.js"
import execa from 'execa'
import path from 'path'

//nodeJS支持顶层await
const answer = await question()

const config = createConfig(answer)

//1、创建文件夹 （项目名）
fs.mkdirSync(getRootPath())
//2、创建index.js
fs.writeFileSync(getRootPath() + '/index.js',createIndexTemplate(config))
//3、创建package.json
fs.writeFileSync(getRootPath() + '/package.json',createPackageTemplate(config))
//4、安装依赖
execa('yarn',{
  cwd:getRootPath(),
}).stdout.pipe(process.stdout)


function getRootPath() {
  return path.resolve(process.cwd(),config.packageName)
}