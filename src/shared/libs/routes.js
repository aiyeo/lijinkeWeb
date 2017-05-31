//根据饿了么教程学习 https://zhuanlan.zhihu.com/p/26710831
//使用webpack2 新增import 方法 来实现按需加载
//webpack 2.4.0 ↑  按需加载写法
//使用 bable-pluginsyntax-dynamic 来解析import 语法
//并且使用第三提案 stage-3
// /* webpackChunkName:"Root" */  是新增的魔法注释  用来设置chunk的名字
//没设置就是 0.chunk.js  1.chunk.js  设置了就是 Root.chunk.js


const Root = () => import(/* webpackChunkName:"Root" */ 'app/components/Root').then(module => module.default)
const Home = () => import(/* webpackChunkName:"Home" */ 'Home').then(module => module.default)
const Photo = () => import(/* webpackChunkName:"Photo" */'app/routes/photo').then(module => module.default)
const Talk = () => import(/* webpackChunkName:"Talk" */'app/routes/talk').then(module => module.default)
const Aritlce = () => import(/* webpackChunkName:"Article" */'app/routes/article').then(module => module.default)
const ArticleDetail = () => import(/* webpackChunkName:"ArticleDetail" */'app/routes/articleDetail').then(module => module.default)
const About = () => import(/* webpackChunkName:"About" */'app/routes/about').then(module => module.default)
const Admin = () => import(/* webpackChunkName:"Admin" */'app/routes/admin').then(module => module.default)
const Excel = () => import(/* webpackChunkName:"Excel" */'app/routes/excel').then(module => module.default)

export default {
  path: "/",
  getComponent: Root,
  indexRoute: {
    getComponent: Home
  },
  childRoutes: [
    {
      path: "home",
      getComponent: Home
    }, {
      path: "photo",
      getComponent: Photo
    }, {
      path: "talk",
      getComponent: Talk
    }, {
      path: "article",
      getComponent: Aritlce
    }, {
      path: "article/detail/:_id",
      getComponent: ArticleDetail
    }, {
      path: "about",
      getComponent: About
    }, {
      path: "admin",
      getComponent: Admin
    }, {
      path: "excel",
      getComponent: Excel
    }
  ]
}

//webpack 2.2 ↓  按需加载写法
//v2.1.0-beta.28  已废弃


// export default {
//   path: "/",
//   getComponent: loadComponent(System.import('app/components/Root')),
//   indexRoute: {
//     getComponent: loadComponent(System.import('Home'))
//   },
//   childRoutes: [
//     {
//       path: "home",
//       getComponent: loadComponent(System.import('Home'))
//     },
//     {
//       path: "photo",
//       getComponent: loadComponent(System.import('app/routes/photo'))
//     },
//     {
//       path: "talk",
//       getComponent: loadComponent(System.import('app/routes/talk'))
//     },
//     {
//       path: "article",
//       getComponent: loadComponent(System.import('app/routes/article'))
//     },
//     {
//       path: "article/detail/:_id",
//       getComponent: loadComponent(System.import('app/routes/articleDetail')),
//     },
//     {
//       path: "about",
//       getComponent: loadComponent(System.import('app/routes/about')),
//     },
//     {
//       path: "admin",
//       getComponent: loadComponent(System.import('app/routes/admin')),
//     },
//     {
//       path: "excel",
//       getComponent: loadComponent(System.import('app/routes/excel'))
//     }
//   ]
// }

