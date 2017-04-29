import Root from "app/components/Root"
import Home from "home"


export default {
    path: "/",
    component: Root,
    indexRoute: {
        component: Home
    },
    childRoutes: [
        {
            path:"home",
            getComponent(location, cb) {
                System.import('home')
                    .then((module) => cb(null, module.default))
                    .catch(err => console.log('aaa',err))
            }
        }
    ]
}