const { readFileSync } = require('fs')
const http = require('http')
const { getPackedSettings } = require('http2')

const getContent = (url) => {
    try {
        // console.log(`'arquivo url ${url}'`)
        const content = readFileSync(url.url)
        return {msg:200,type:url.type,content:content}
    } catch {
        //console.log('retornando erro');
        try {
            const content = readFileSync(`./pages/404.html`)    
            //console.log('enviando um 404 personalizado')
            return {msg:404,type:'text/html',content:content}  
        }catch{
            //console.log('enviando um 404 padrão')
            return {msg:404,type:'text/html',content:'<h1>404 - Page Not Found</h1>'}
        }
    }
}

const trataURL = (url) => {
// tratamento besta pra poder receber pedidos de imagens e um css/javascript
 if(url.split('.').length>1){
    const extention = url.split('.')[url.split('.').length-1]
    const type = ((extention === 'ico')||(extention === 'png'))?'image/png':
        (extention === 'jpg')?'image/jpeg':
        'text-plain';

    return {type:type,url : `./assets${url}`}
 } else {
    return {type:'text/html',url : `./pages${url}${((url === '/')?'index':'')}.html`}
 }
}

const server = http.createServer((req,res)=>{
  console.log('user hit the server')
  const url = trataURL(req.url);
  const content = getContent(url)
  res.writeHead(content.msg,{'content-type':content.type})
  res.write(content.content)
  res.end()
})

server.listen(5001)