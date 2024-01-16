import { createRouter , createWebHistory } from 'vue-router'
import routerLost from '../views/lost/router-lost.js'
import home from '../views/Home.vue'
import routerSignin from '../views/member/router-member.js'


const routes =[
    ...routerLost,
    ...routerSignin,
    {name:"home",path:"/router/home",component:home},

]


const router = createRouter({history: createWebHistory(),routes: routes,})
export default router