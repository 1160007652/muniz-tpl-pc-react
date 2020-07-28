
# Chrome 插件

### 经验总结
#### 1、在 chrome 扩展插件中 Chrome.storage 转化 [] 数组的问题.

> 问题

```js
{ data: [1,2,3,4] } 
// 转化为了
{ data: [{0:1}, {1: 2}, {2:3}, {3:4}] }
```

> 解决方案

```json
先使用JSON.stringify() , 将Object 对象转成字符串 , 在调用 Chrome.storage.sync.set 进行存储
{ data: [1,2,3,4] } 
// 这样转化 结果就一样
{ data: [1,2,3,4] }
```

> 配置options选项页面

```json
  {
    "options_page": "options.html",
    "options_ui": {
      "page": "options.html",
      "chrome_style": true
    },
  }
```
