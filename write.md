```shell
─src
    ├─app
    ├─constants
    ├─controller
    ├─middleWare
    ├─router
    ├─service
    └─utils
```

**postman自动添加token**

![image-20220419142527501](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220419142527501.png)

在登录后获取token自动设置为全局变量



**细节：项目任何一个地点使用模块功能使用(比如:fs.readFileSync)的相对路径都是相对于process.cwd,process.cwd的值取决于启动当前项目时所在的路径，例如(src在node文件夹里)`nodemon ./src/01Index.js`此时process.cwd为node。而不是相对于执行文件的**

### 1.创建和获取环境变量

在根路径下创先`.env`文件 在里面配置环境变量(`process.arg`)
运用`dotenv`的脚本 下载引入后 ，`dotenv.config() `即可在process里获取变量

### 2.文件的依赖关系

##### 1. router文件夹

这里面是针对各个功能的路由 因为`koa` 只能在路由内功能比较全面

##### 2. controller文件夹

这里面储存的是各个路由对应路径的回调函数

##### 3. service文件夹

这里面是针对数据库的操作 

**依赖关系，依次向下**

### 3.各个功能细节

#### 1.注册接口

运用路由 对用户传输的密码做多层处理，先判断是否为空，再将其加密

//加密算法

```js
const crypto = require("crypto");

const md5Password = (password) => {
  const md5 = crypto.createHash("md5");
  return md5.update(password).digest("hex");	//返回的是字符串 若不写digest("hex") 则返回值是2进制的buffer
};
module.exports = md5Password;

```

#### 2.登录接口



![image-20220414132152253](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414132152253.png)

##### 1. session+cookie

**cookie**

![image-20220414132953916](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414132953916.png)

![image-20220414133724397](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414133724397.png)

**(若不设置Path则此域名下的所有路径都可以接受此cookie)**

客户端和服务端都可以设置cookie

在客户端 直接调用即可设置

```js
<script>
    //这里的max-age是以秒为单位
        document.cookie = "name=fmy;max-age=5;"
</script>
```

服务端

在 `koa` 里

![image-20220414142716025](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414142716025.png)

```js
ctx.cookies.set(name,value,options)//设置cookie
ctx.cookies.get(name)//获取cookie
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------**session**

session是依赖cookie的

需要下载引入 外面的包 `koa-seesion`

**signed：是否签名 默认是true**

![](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414141954005.png)

**`maxAge`:以毫秒为单位 在cookie里同样 但是客户端设置则是以秒为单位**

```js
app.use(session)
//通过此中间件，ctx里有了session属性，通过此属性可以设置session
//例如
ctx.session.user={id,name}
ctx.session.user //直接取得这个cookie 且会自动解码🐧
```

![image-20220414142946242](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414142946242.png)

**与cookie的不同是 其将值运用`base64`编码再记录在客户端**

![image-20220414150435610](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414150435610.png)

会生成签名 使得更安全

![image-20220414143328826](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414143328826.png)

若是客户端修改cookie 服务端是通过`ctx.seesion.user获取的为undifined`

session+cookie的缺点

cookie会自动附加在每个请求头里

![image-20220414145102716](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414145102716.png)

##### 2. token

![image-20220414150715648](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414150715648.png)

<img src="C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414151415266.png" alt="image-20220414151415266" style="zoom:200%;" />

**使用举例**

安装`jsonwebtoken`库

```
const jwt=require("jsonwebtoken")
```

![image-20220414153711328](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414153711328.png)

`jwt.verify解密出错的话会直接报错 所有用try catch捕捉`

`expiresIn以秒为单位`

**Bearer是一种常用的自定义请求头信息的方式，用此方式会多出现Bearer+TOKEN的字符串**

![image-20220414153816221](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414153816221.png)

**默认加密方式是对称性的**

**非对称**

创建私🔑(通过git bush)

![image-20220414155409809](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414155409809.png)

创建公🔑

![image-20220414155440493](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414155440493.png)

运用`fs`模块 获取私🔑和公🔑 并**修改加密算法** 因为默认加密算法是对称加密

![image-20220414155752532](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414155752532.png)

验证token时也要指定验证算法，并且把配置公🔑

![image-20220414155954843](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220414155954843.png)

**注意！！！！替换是一定是`const token = authorization.replace("Bearer ", "");`空格不能省略**

解析的token的值的类型，会多添加俩属性 **iat:颁发时间,exp:过期时间**

![image-20220415090806242](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220415090806242.png)

### 3.用户操作功能接口

分页 的数据库操作

```mysql
SELECT
m.id id,
m.content content,
m.createAt createTime,
m.updateAt updateTime, JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author
FROM
comment m
LEFT JOIN user u ON m.user_id = u.id
LIMIT ?,?
第一个?对应偏移量offest,第一个?对应数据量size
```

### 4.上传文件

#### 1.浏览器在线浏览本地图片图片

写一个接口，返回

![image-20220419081445093](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220419081445093.png)

需要设置头信息，不然默认是下载

在线预览图片的本质是访问接口，接口返回图片的内容在浏览器上展示出来

2.将图片转为其他尺寸

![image-20220419135738984](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220419135738984.png)

`jump.AUTO是随着另一边尺寸，自动缩放`
