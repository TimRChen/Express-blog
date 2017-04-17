## Express-blog
my item. use express constructor a blog system

## 0.0.4 版本
*   加入MongoDB数据库，实现数据动态增删
*   数据库与前后端逻辑联调测试
*   对模板pug文件作了相应的修改

## 0.0.3 版本
*   首页多文章结构添加
*   加入动态脚本动画canvas-nest.js
![关注Timrchen](https://github.com/TimRChen/photoRepo/blob/master/2017_01.gif)


## 0.0.2 版本
*   前后端路由完全打通
*   前端动态添加文章图片（后期由数据库实现）
*   完善detail.pug页

## bug
*   在给a标签设置href属性时，不能像jade那样使用： a(href="/detail/#{_id}")")
*   这样的写法是老版本，目前已不再支持! 官方的解释是：This syntax is no longer supported. Alternatives could be found below. Check our migration guide for more information on other incompatibilities between Pug v2 and previous versions.
*   https://pugjs.org/language/attributes.html 点击链接进行查看
*   ps: pug 语法上应严格缩进，切记！


## 0.0.3 版本效果图

![关注Timrchen](https://raw.githubusercontent.com/TimRChen/photoRepo/master/20170417134315.png)
![关注Timrchen](https://raw.githubusercontent.com/TimRChen/express-blog/master/README/20170414_03.png)
![关注Timrchen](https://raw.githubusercontent.com/TimRChen/express-blog/master/README/20170414_04.png)