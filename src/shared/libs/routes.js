//使用webpack2 新增import 方法 来实现按需加载
//使用 bable-pluginsyntax-dynamic 来解析import 语法
import Root from "app/components/Root"
// import Home from "home"
// const Home = ()=> import('home')

//赖加载组件
/**
 * importor 加载器
 * name 懒加载组件的名字   export deafult class Home ...  这里默认就是Home
 */
const loadComponent = (importor, name = 'default') => (location, cb) => {
  importor.then((module) => {
    console.info(`动态路由加载成功!`)
    cb(null, module[name])
  })
    .catch((err) => {
      console.debug(`动态路由加载失败:${err}`)
    })
}

export default {
  path: "/",
  component: Root,
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
    },
    {
      path: "test",
      getComponent: loadComponent(System.import('app/routes/test'))
    }
  ]
}

