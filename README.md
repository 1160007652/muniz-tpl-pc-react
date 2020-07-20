findora wallet browser extension project

## Framework configuration

react、react-router、mobx、webpack、less

## Branching

1. master - formal environment
2. dev/\* - development environment
3. bug/\* - bug recurrence environment

## Project begining:

### Preconditions:

1. Install [Node.js](https://nodejs.org/en/download/) globally (version >= v10.16.3 );
2. Install **yarn** package management tool globally;

```bash
$ npm install -g yarn
```

3. In the project directory, execute the following command:

```bash
$ yarn install
```

### Build development environment:

Execute the following commands in the project update directory to automatically open the browser and present the development environment.

```bash
$ yarn dev
```

> Open Google Chrome first, execute the command, the effect will be better!

### Build a production environment:

Execute the following commands in the project update directory to build resources for execution in the production environment.

```bash
$ yarn build
```

> The constructed resources are located in **" root directory/extensions "**

### Graphic introduction

![打开浏览器扩展面板](./docs-src/images/help-1.png)
![打开开发者模式](./docs-src/images/help-2.png)
![拖拽插件到扩展面板中](./docs-src/images/help-3.png)
![Open findora wallet ext](./docs-src/images/help-4.png)
![使用插件](./docs-src/images/help-5.png)
