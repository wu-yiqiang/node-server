## 5分钟配置好ts + node 小项目

#### 简介

如今typescript在前端中非常火热，已经成为前端开发工程师的必备技能之一，它弥补了很多javascript的缺陷，具有静态类型检查，ide智能提示，大大提高了代码的可读性，如果能比较好的结合进node项目开发中，岂不是更好？接下来展示如何快速整合。



完整代码 -> [Github](https://github.com/dalewang1995/typescript-node)

#### 基本步骤

本地项目名称

```bash
mkdir typescript-node
cd typescript-node
```

初始化package.json

```bash
npm init -y
```

安装typescript作为开发依赖，因为当我们部署node时，是将ts编译为js执行部署的。

```bash
npm i typescript -D
```

所有的ts项目必需在根目录设置配置文件`tsconfig.json` 我们可以自动生成一些基本的设置

```bash
tsc --init --rootDir src --outDir dist
```

除此之外还需要一些必要的设置

```json
{
  "compilerOptions": {
    "module": "commonjs",  //指定生成哪个模块系统代码
    "esModuleInterop": true, 
    "allowSyntheticDefaultImports": true,
    "target": "es6", //目标代码类型
    "noImplicitAny": true, //在表达式和声明上有隐含的'any'类型时报错。
    "moduleResolution": "node",
    "sourceMap": true, //用于debug   
    "outDir": "dist", //仅用来控制输出的目录结构
    "baseUrl": "."
  },
  "include": ["src/**/*"]
}
```

安装`express`

```bash
npm i express
```

安装必要的`typescript @type`类型定义，这样可以直接在项目中使用这些类型，

使用`ts-node`，可以直接执行`typescript`文件而无需对其进行编译，这里有很多ts社区提供的带有类型的npm包，[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

本次需要安装一下npm包

```bash
npm i -D @types/node @types/express nodemon ts-node
```

创建src目录，并且创建文件

```bash
mkdir src
cd src
touch index.ts handlers.ts
```

`handlers.ts`代码如下：

```typescript
import { Request, Response } from 'express';

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('typescript & node is working');
};

export const helloHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { name = 'World' } = params;
  const response = helloBuilder(name);

  return res.json(response);
};
```

`index.ts`代码如下：

```typescript
import express from 'express';
import { rootHandler, helloHandler } from './handlers';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
```

因为引入了 `@types/node` 类型包，所以 `process.env.PORT`才不会报错

在`package.json`中添加运行脚本

```json
  "scripts": {
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
    "build":"tsc",
    "start":"node dist/index.js"
  }
```

#### 使用

本地开发自动构建 `npm run dev`

编译&部署 `npm run build / npm run start` 

