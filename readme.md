# Webpack BluePrint

### [How to build a React project from scratch using Webpack 4 and Babel](https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32)

```bash
yarn init
```

```bash
yarn add -D webpack webpack-cli http-server
```

```bash
yarn add react react-dom react-router-dom @babel/runtime @babel/polyfill numeral jquery whatwg-fetch
```

```bash
yarn add -D @babel/core babel-loader @babel/preset-env @babel/preset-react
yarn add -D @babel/plugin-transform-runtime @babel/plugin-transform-async-to-generator @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-dynamic-import
```

```bash
yarn add react-loadable
```

```json
{
  "plugins": [
    "@babel/plugin-transform-async-to-generator", //
    "@babel/plugin-proposal-object-rest-spread", //
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

```bash
yarn add -D html-webpack-plugin html-loader webpack-dev-server prop-types
yarn add -D uglifyjs-webpack-plugin clean-webpack-plugin terser-webpack-plugin
yarn add -D css-loader style-loader mini-css-extract-plugin node-sass sass-loader
yarn add -D postcss postcss-loader postcss-import postcss-preset-env
yarn add -D strip-loader expose-loader imports-loader exports-loader
yarn add -D browserslist autoprefixer cssnano
```

```bash
yarn add -D webpack-merge fs-extra yargs merge-json
yarn add -D cross-env dotenv dotenv-expand dotenv-extended config
```

```
yarn add -D webpack-node-modules-list webpack-dashboard webpack-bundle-analyzer duplicate-package-checker-webpack-plugin webpack-async-chunk-names-plugin
```

~~`yarn add -D webpack-split-by-path`~~

### correction in webpack-node-modules-list starting line \# 35

```js
let context = contextArray.join(path.sep),
  npmModule = contextArray[contextArray.indexOf('node_modules') + 1],
  packageJsonFile = path.join(context, 'package.json'),
  packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'UTF-8'));

npmModules.set(packageJson.name, {
  name: packageJson.name,
  version: packageJson.version,
  homepage: packageJson.homepage,
  license: getLicenses(packageJson)
});
```

**to**

```js
let context = contextArray.join(path.sep),
  npmModule = contextArray[contextArray.indexOf('node_modules') + 1],
  packageJsonFile = path.join(context, 'package.json'),
  packageJson = fs.existsSync(packageJsonFile) ? JSON.parse(fs.readFileSync(packageJsonFile, 'UTF-8')) : null;

if (!(packageJson === null || packageJson === undefined)) {
  npmModules.set(packageJson.name, {
    name: packageJson.name,
    version: packageJson.version,
    homepage: packageJson.homepage,
    license: getLicenses(packageJson)
  });
}
```

```bash
yarn add -D eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
yarn add -D prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier
```

## ESLint running locally

- install `npm i -g eslint-cli` and remove all eslint related packages from `echo "$(npm -g root)"`
- run `eslint` from root
  If you want to eslint globally use below code

```
eslint --ext '.js' -c '.eslintrc.js' src --fix
```

---

## \* \*

---

- `yarn add -D nodemon` -or- `npm i -g nodemon`
- ~~`npm i -g webpack-stats-graph`~~
  `yarn global add https://github.com/princeppy/webpack-stats-graph.git`
  `npm i -g https://github.com/princeppy/webpack-stats-graph.git`

---

> **Edit Needed on webpack-stats-graph v(0.2.1)**
> either install 'https://github.com/princeppy/webpack-stats-graph.git' or edit as below
>
> - run `npm root -g`
> - navagate to '\webpack-stats-graph\'
> - open 'index.js'
> - add line (#325) `.filter(d => d.moduleId !== null)` before line `.map(d => ({ graphId: d.moduleId.toString(), type: d.type, }))`
>
> ```js
> issuers: m.reasons
>    .filter(d => d.moduleId !== null)
>    .map(d => ({
>        graphId: d.moduleId.toString(),
>        type: d.type,
>    })),
> ```
>
> - replace line (#414) `const clusterDetails = parseClusterDetails(chunkIds.map(c => stats.chunks[c]));` to `const clusterDetails = parseClusterDetails(chunkIds.filter(id => stats.chunks[id]).map(c => stats.chunks[c]));`
>
> ```js
> const clusterDetails = parseClusterDetails(chunkIds.filter(id => stats.chunks[id]).map(c => stats.chunks[c]));
> ```

---

##### Enabling hot Reloading instead of reloading page.

```js
if (module.hot) {
  module.hot.accept(console.log.bind(console));

  const doc = angular.element(document);
  const injector = doc.injector();

  if (injector) {
    const actualService = Object.getPrototypeOf(injector.get('scoring'));
    const newScoringService = Object.getPrototypeOf(new Scoring());
    // note: just replaces functions
    Object.getOwnPropertyNames(actualService)
      .filter(key => typeof actualService[key] === 'function')
      .forEach(key => (actualService[key] = newScoringService[key]));
    doc
      .find('html')
      .scope()
      .$apply();
    console.info('[scoring] Hot Swapped!!');
  }
}
```

---

## Resources

- [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-tutorial/)
- [Learn the basics of destructuring props in React](https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477)
- [React: How To Access Props In A Functional Component](https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b)
- [How to Setup VS Code + Prettier + ESLint](https://www.youtube.com/watch?v=YIvjKId9m2c)
- [Configure ESLint, Prettier, and Flow in VS Code for React Development](https://medium.com/@sgroff04/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213)
- [Integrating Prettier + ESLint + Airbnb Style Guide in VSCode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [How to write a frontend JavaScript plugin using ES6 + SASS + Webpack](https://itnext.io/how-to-write-a-frontend-javascript-plugin-using-es6-sass-webpack-a1c6d6fdeb71)
- [Webpack (v4) Code Splitting using SplitChunksPlugin](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)
- [Creating a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)

---

```
git add . && git commit -am Initial && git push origin master
```

or

```
git add . ; git commit -am 'Initial' ; git push origin master ; git status ;
```

---

- https://github.com/wbkd/webpack-starter
- react-for-beginners
  - https://blog.codingbox.io/react-for-beginners-part-1-setting-up-repository-babel-express-web-server-webpack-a3a90cc05d1e
  - https://blog.codingbox.io/react-for-beginners-creating-isomorphic-react-redux-app-and-deploying-it-on-heroku-6a313f8f3693
  - https://blog.codingbox.io/react-for-beginners-adding-assets-to-your-isomorphic-application-using-webpack-isomorphic-tools-b6b636a79d96
  - https://github.com/codingbox/isomorphic-react-redux-tutorial
- https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
- https://www.valentinog.com/blog/react-redux-tutorial-beginners/
- https://www.robinwieruch.de/
  - https://www.robinwieruch.de/minimal-react-webpack-babel-setup/
  - https://www.robinwieruch.de/react-eslint-webpack-babel/
  - https://github.com/rwieruch/minimal-react-webpack-babel-setup
- https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
- https://www.sitepoint.com/beginners-guide-webpack-module-bundling/
- https://github.com/lifenautjoe/webpack-starter-basic
- https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
- https://codeburst.io/top-webpack-plugins-for-faster-development-a2f6accb7a3e
- https://survivejs.com/webpack/extending/plugins/
- https://medium.com/front-end-hacking/how-to-write-your-first-webpack-plugin-c5d6a175f2dc
- https://css-tricks.com/introduction-webpack-entry-output-loaders-plugins/
- https://reactjs.org/docs/typechecking-with-proptypes.html
- https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
  - https://www.npmjs.com/package/strip-loader

# React ~ Redux ~ Thunk

```
yarn add redux react-redux redux-thunk
```
