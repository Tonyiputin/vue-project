import signin from './Signin.vue'
import login from './Login.vue'
import forgetPassword from './Forgetpassword.vue'
import memberInfo from './MemberInfo.vue'

export default [
    {name:"signin",path:"/router/signin",component:signin},
    {name:"login",path:"/router/login",component:login},
    {name:"forgetPassword",path:"/router/forgetPassword",component:forgetPassword},
    {name:"memberInfo",path:"/router/memberInfo:email",component:memberInfo},
    // {name:"loginregister",path:"/router/loginregister",component:loginregister}
]