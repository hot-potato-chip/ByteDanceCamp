const {promisify} = require('util')
const text = promisify(require('figlet').text)
const clear = require('clear')
const chalk = require('chalk')
const {clone} = require('./download')
const open = require('open')

const log = content => console.log(chalk.green(content));
const spawn = async (...args) => {
  const { spawn } = require('child_process')

  const options = args[args.length - 1]
  if(process.platform === 'win32'){
    options.shell = true
  }

  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close',() => {
      resolve()
    })
  })
} 

module.exports = async name => {
  //打印欢迎界面
  clear()
  const data = await text('PP',{
    font:'Ghost'
  })
  log(data)

  //项目模板
  log('创建项目'+name)
  //await clone('github:su37josephxia/vue-template',name)

  //下载依赖
  log('安装依赖...')
  await spawn('npm',['install'],{cwd: `./${name}`})
  log(chalk.green(`
  安装完成
  To get start:
  ========================
    cd ${name}
    npm run serve
  ========================
  `))

  open('http://localhost:8080')
  await spawn('npm',['run','serve'],{cwd: `./${name}`})
}