### [How to build a React project from scratch using Webpack 4 and Babel](https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32)

```
yarn init
```

```
yarn add -D webpack webpack-cli
```

```
yarn add react react-dom react-router-dom @babel/runtime @babel/polyfill numeral
```

```
yarn add -D @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
yarn add -D html-webpack-plugin html-loader webpack-dev-server prop-types
yarn add -D uglifyjs-webpack-plugin clean-webpack-plugin
yarn add -D css-loader style-loader mini-css-extract-plugin node-sass postcss-loader sass-loader
yarn add -D autoprefixer cssnano
```

```
yarn add -D webpack-merge cross-env dotenv dotenv-expand dotenv-extended fs.extra yargs config
```

```
yarn add -D eslint prettier babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react prettier-eslint eslint-config-prettier eslint-plugin-prettier
```

```

```

```

```

## Resources

- [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-tutorial/)
- [Learn the basics of destructuring props in React](https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477)
- [React: How To Access Props In A Functional Component](https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b)
- [How to Setup VS Code + Prettier + ESLint](https://www.youtube.com/watch?v=YIvjKId9m2c)
- [Configure ESLint, Prettier, and Flow in VS Code for React Development](https://medium.com/@sgroff04/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213)
- [Integrating Prettier + ESLint + Airbnb Style Guide in VSCode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [How to write a frontend JavaScript plugin using ES6 + SASS + Webpack](https://itnext.io/how-to-write-a-frontend-javascript-plugin-using-es6-sass-webpack-a1c6d6fdeb71)
- **[Webpack (v4) Code Splitting using SplitChunksPlugin](https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)**

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
