# WebAssembly

### [学习指南](https://www.rust-lang.org/zh-CN/what/wasm)

### 经验总结
#### 1、在 chrome 扩展插件中使用 wasm 技术,不生效的问题.
> 解决方案

```json
在 manifest.json 配置清单中, 添加 如下代码
"content_security_policy": "script-src 'self' 'wasm-eval'; object-src 'self'"
```

#### 2、在 Webpack 中使用 wasm 的问题.
> 解决方案

因为钱包中使用的 **wasm** , 是使用Rust导出的 **wasm** **es6** 模块. 且 Webpack 不支持同步加载 **wasm** 文件资源, 所以需要使用异步的形式去加载, 代码如下:
```js
import('wasm');
```
Webpack 4 , 支持对 **wasm** 的解析, rust 导出 wasm 时,使用了  **wasm-pack** 工具, 该工具在导出时,可以生成支持 **es6** 风格的模块.在生成的wasm.js 中,会这样去调用 **wasm_bg.wasm** 模块,代码如下:
```js
import * as wasm from './wasm_bg.wasm';
```
