// Koa-router 是 koa 的一个路由中间件，
// 它可以将请求的URL和方法（如：GET 、 POST 、 PUT 、 DELETE 等） 
// 匹配到对应的响应程序或页面
import Router from "koa-router";
import userService from "../controller/user.controller"
// 数据处理中间件
import { verifyUser, handlePassword } from "../middleware/user.middleware";
import fs from "fs"
import path from "path"
const fse = require('fs-extra')
const MIX_SIZE = 1024 * 1024 * 1024
const koaForm = require('formidable-upload-koa')
// 通过调用 router.prefix(prefix) 来设置路由的前缀
const userRouter = new Router({ prefix: "/users" });
const download = async (ctx:any, next:any) => {
   let fileSavePath = path.join(__dirname, "../download");
  //下载 的文件 地址
  let fileURL = fileSavePath+"/download.svg";

  //下载保存的文件路径
  const readStream = fs.createReadStream(fileURL);
  const writeStream = fs.createWriteStream(fileURL);
  // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
  ctx.res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=download.msi'
  });
  readStream.on('data', (chunk:any) => {
    console.log('data')
    writeStream.write(chunk);
  })
  readStream.on('end', () => {
    console.log('end')
    writeStream.end();
  })
  // 将可读流传给响应对象response
  return readStream.pipe(writeStream);
}



async function saveFile(data:any) {
  const { name, type, size, filePath } = data
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return Promise.reject('文件体积过大')
  }
  // 重新命名文件
  const fileName = Date.now() + '.' + name
  // 目的地
  const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  // 移动
  await fse.move(filePath, distFilePath)

  // 返回
  return Promise.resolve({
    url: `http://127.0.0.1:4444/${fileName}`
  })
}
const upload = async (ctx:any, next:any) => {
   const file = ctx.req.files['file']  // 在ctx.req.files里获取到上传的文件，['file']是前端input上传文件组件的name属性值
  console.log('sdsda', file)
//  const { size, path, name, type } = file  // file 里面的参数
//  ctx.body = await saveFile({  // 将文件移动的静态资源目录，用于下载
//    name,
//    type,
//    size,
//    filePath: path
//  })
}
const options = {
  uploadDir: path.join(__dirname, "../upload"),  // 文件存放的位置
  keepExtensions: true,  // 包含扩展名
  maxFileSize: 1024 * 1024 * 30 // 大小为 30m
}
userRouter.post("/", verifyUser, handlePassword,userService.create);
userRouter.post("/download", download);
//userRouter.post("/upload", koaForm(options), upload);


export = userRouter
