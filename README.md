## Express-blog

## 1.0.0 v
*   增加管理菜单
*   修复编辑文章内容消失问题，可对文章进行二次快速编辑

## 0.0.9 v
*   通过`Mocha`测试，并修复测试出现问题
*   部署上线
*   取消注册功能

## 0.0.9 bug
*   部署bug—— fs.rename方法在linux下无法更改文件名`已修复`

## 0.0.8 v
*   增加评论功能`fail`
*   增加`友言`评论系统
*   增加访问量统计功能

## 0.0.7 v
*   增加用户权限
*   增加`markdown`文本编辑器
*   在`textarea`中实现Tab键缩进
*   修复删除文章功能
    *   实现了删除文章，文章标题图片

![关注Timrchen](https://github.com/TimRChen/photoRepo/blob/master/2017_02.gif)

## 0.0.6 v
*   增加用户系统
    *   实现`session`持久化
    *   会话持久化实现
*   文件结构调整，MVC分离理念
*   增加注册，登录页面

## 0.0.6 bug
*   密码匹配不一致问题，已解决，由于注册存储`user`变量赋值错误导致 即: `let user`重新声明了变量，导致, `user.save`方法后，导致在数据库创建了一条新表，继而导致了在`bcrpt.compare`时`this.password`取出的加密密码值与登陆输入的密码值`_password`不一致，导致了匹配错误

## 0.0.5 v
*   添加图片上传功能
*   将图片上传路径存入至数据库中
*   增加grunt自动构建工具

## 0.0.5 bug 
*   目前上传的图片仅支持原images目录下的图片，其余地址上传的图片均会被以text/html类型来进行解析，解析格式不正确，该问题最后发现是使用 `Multi` 模块时由于`dest`路径未给对，导致了图片引入路径发生错误！已解决！
*   图片上传解析出问题，最后发现由于enctype采用了"multipart"，我们在app.js中应加入multer插件对multipart格式上传的数据进行解析，否则出现报错！
*   数据库报错: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html 解决: 重点在这一句，赋值一个全局Promise
mongoose.Promise = global.Promise

## Multer 相关说明
    1.文件上传有以下方法
        muilter.single('file'), //适用于单文件上传
        muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
        muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
    2.file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。
        表单记得加上  enctype='multipart/form-data'
    3.对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。

## 0.0.4 v
*   加入MongoDB数据库，实现数据动态增删
*   数据库与前后端逻辑联调测试
*   对模板pug文件作了相应的修改

## 0.0.3 v
*   首页多文章结构添加
*   加入动态脚本动画canvas-nest.js
![关注Timrchen](https://github.com/TimRChen/photoRepo/blob/master/2017_01.gif)

## 0.0.3 版本效果图

![关注Timrchen](https://raw.githubusercontent.com/TimRChen/photoRepo/master/20170417134315.png)

## 0.0.2 v
*   前后端路由完全打通
*   前端动态添加文章图片（后期由数据库实现）
*   完善detail.pug页

## 0.0.2 bug
*   在给a标签设置href属性时，不能像jade那样使用： a(href="/detail/#{_id}")")
*   这样的写法是老v，目前已不再支持! 官方的解释是：This syntax is no longer supported. Alternatives could be found below. Check our migration guide for more information on other incompatibilities between Pug v2 and previous versions.
*   https://pugjs.org/language/attributes.html 点击链接进行查看
*   ps: pug 语法上应严格缩进，切记！
