import signin from './Signin.vue'
import login from './Login.vue'
import forgetPassword from './Forgetpassword.vue'
// import loginregister from './LoginRegister.vue'

export default [
    {name:"signin",path:"/router/signin",component:signin},
    {name:"login",path:"/router/login",component:login},
    {name:"forgetPassword",path:"/router/forgetPassword",component:forgetPassword},
    // {name:"loginregister",path:"/router/loginregister",component:loginregister}
]