const fs = require('fs')
const http = require('http')

http.createServer((req,res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./index.html',(err,data) => {
      if (err) {
        res.writeHead(500,{
          'Content-Type':'text/plain;charset=utf-8'
        })
        res.end('服务器出现了一些问题')
        return
      }
      res.statusCode = 200
      res.setHeader('Content-Type','text/html')
      res.end(data)
    })
  } else {
    res.writeHead(400,{
      'Content-Type':'text/plain;charset=utf-8'
    })
    res.end('不存在的页面')
  }
})
.listen(3002,() => {
  console.log('server at 3002');
})