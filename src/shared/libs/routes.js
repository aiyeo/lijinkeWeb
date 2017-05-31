//使用webpack2 新增import 方法 来实现按需加载
//webpack 2.4.0 ↑  按需加载写法
//使用 bable-pluginsyntax-dynamic 来解析import 语法
//并且使用第三提案 stage-3

// const loadComponent = (importor, name = 'default')  => {
//   import(importor).then(module => {
//     return module[name]
//   }).catch(err=>{

//   })
// }

// const Root = () => import('app/components/Root')
// const Home = () => import('Home')
// const Photo = () => import('app/routes/photo')
// const Talk = () => import('app/routes/talk')
// const Aritlce = () => import('app/routes/article')
// const ArticleDetail = () => import('app/routes/articleDetail')
// const About = () => import('app/routes/about')
// const Admin = () => import('app/routes/admin')
// const Excel = () => import('app/routes/excel')

// export default {
//   path: "/",
//   component: Root,
//   indexRoute: {
//     component: Home
//   },
//   childRoutes: [
//     {
//       path: "home",
//       component: Home
//     },
//     {
//       path: "photo",
//       component: Photo
//     },
//     {
//       path: "talk",
//       component: Talk
//     },
//     {
//       path: "article",
//       component: Aritlce
//     },
//     {
//       path: "article/detail/:_id",
//       component: ArticleDetail
//     },
//     {
//       path: "about",
//       component: About
//     },
//     {
//       path: "admin",
//       component: Admin
//     },
//     {
//       path: "excel",
//       component: Excel
//     }
//   ]
// }

//webpack 2.2 ↓  按需加载写法

//赖加载组件
/**
 * importor 加载器
 * name 懒加载组件的名字   export deafult class Home ...  这里默认就是Home
 */
const loadComponent = (importor, name = 'default') => (location, cb) => {
  importor.then((module) => {
    console.info(`[success] 动态路由加载成功!`)
    cb(null, module[name])
  })
    .catch((err) => {
      console.debug(`[error] 动态路由加载失败,失败原因:${err}`)
    })
}

export default {
  path: "/",
  getComponent: loadComponent(System.import('app/components/Root')),
  indexRoute: {
    getComponent: loadComponent(System.import('Home'))
  },
  childRoutes: [
    {
      path: "home",
      getComponent: loadComponent(System.import('Home'))
    },
    {
      path: "photo",
      getComponent: loadComponent(System.import('app/routes/photo'))
    },
    {
      path: "talk",
      getComponent: loadComponent(System.import('app/routes/talk'))
    },
    {
      path: "article",
      getComponent: loadComponent(System.import('app/routes/article'))
    },
    {
      path: "article/detail/:_id",
      getComponent: loadComponent(System.import('app/routes/articleDetail')),
    },
    {
      path: "about",
      getComponent: loadComponent(System.import('app/routes/about')),
    },
    {
      path: "admin",
      getComponent: loadComponent(System.import('app/routes/admin')),
    },
    {
      path: "excel",
      getComponent: loadComponent(System.import('app/routes/excel'))
    }
  ]
}

