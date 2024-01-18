<template>
        
        <div><button type="button" v-if="isLoggedIn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login" >
                    Login/Register
                    </button></div>
        <div><span v-if="!isLoggedIn" >{{ email }}</span>
            <button class="btn btn-secondary" @click="loggedOut" v-if="!isLoggedIn" >登出</button></div>





<div class="login" >
    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="modal-body">

                    <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a :class="loginActive" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login"    @click="setActiveTab('login')"     aria-selected="true" >登入</a>
                        </li>
                        <li class="nav-item">
                            <a :class="registerActive" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" @click="setActiveTab('register')"   aria-selected="false">註冊</a>
                        </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                

                        <div :class="loginFormActive "  id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                            <h5 class="text-center">會員登入</h5>
                            <div class="form-group">
                                <label  for="exampleInputEmail1">Email</label>
                                <input v-model="email" @blur="emailVerify" @focus="emailErrorClear" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-red">{{ emailError }}</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input  v-model="password" @blur="loginPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <button @click="login"  class="btn btn-primary" :disabled="isDisabled" data-bs-dismiss="modal">登入</button>
                            </div>
                        </div>



        
                        <div :class="registerFormActive" id="pills-register"  role="tabpanel" aria-labelledby="pills-register-tab">
                            <h5 class="text-center">會員註冊</h5>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input v-model="email"  @blur="emailVerify" @focus="emailErrorClear" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-red">{{ emailError }}</small>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input @input="registerationPasswordVerify" v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                                <small :class="{ 'form-text': true, 'text-muted': lengthVerify, 'text-red': !lengthVerify }">1.長度必須大於8<br></small>
                                <small :class="{ 'form-text': true, 'text-muted': hasDigit, 'text-red': !hasDigit }">2.必須包含數字<br></small>
                                <small :class="{ 'form-text': true, 'text-muted': hasUpperCase, 'text-red': !hasUpperCase }">3.必須包含大寫字母<br></small>
                                <small :class="{ 'form-text': true, 'text-muted': hasLowerCase, 'text-red': !hasLowerCase }">4.必須包含小寫字母<br></small>
                                
                            </div>
                            <div class="form-group">
                                <button @click="signup"  class="btn btn-primary" :disabled="isDisabled" >註冊</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </div>
</div>


                
                

</template>
    
<script setup >


import { ref , onMounted} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../../router/router.js';


const email = ref("");
const isLoggedIn = ref(true);
const password = ref("");
const emailError = ref("");
const lengthVerify = ref(true);
const hasDigit = ref(true);
const hasLowerCase = ref(true);
const hasUpperCase = ref(true);
const isDisabled = ref(true);
const loginActive=ref('nav-link active');
const registerActive=ref('nav-link');
const loginFormActive=ref('tab-pane fade show active');
const registerFormActive=ref('tab-pane fade');

const emits = defineEmits(
    ['sendIsLoggedIn','sendUserEmail']
)


function loggedOut(){
    localStorage.removeItem('token');
    isLoggedIn.value = true;
    emits('sendIsLoggedIn', isLoggedIn.value);
}

onMounted(() => {
  // 在組件加載時檢查本地存儲中是否有有效的Token
const token = localStorage.getItem('token');
    if (token) {
        emits('sendIsLoggedIn', false);
        // 假設有Token，用戶已登入，可以向後端發送請求獲取用戶信息等
        isLoggedIn.value = false;
        axios.get("http://localhost:8080/pet/refresh", {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        }).then(response => {
        // 更新userData
        console.log(response.data);
        email.value = response.data;
        emits('sendUserEmail' , email.value)
        }).catch(error => {
        // 處理錯誤
        console.error(error);
        });
    }
    });
    
function setActiveTab(tab){
    // tab-pane fade show active
    isDisabled.value = true;
    if(tab=='login'){
        loginActive.value='nav-link active';
        loginFormActive.value='tab-pane fade show active';
        registerActive.value='nav-link';
        registerFormActive.value='tab-pane fade';
    }else{
        loginActive.value='nav-link';
        loginFormActive.value='tab-pane fade ';
        registerActive.value='nav-link active';
        registerFormActive.value='tab-pane fade show active';
    }
}
let vm = this;

function registerationPasswordVerify(){
    lengthVerify.value = password.value.length > 8 ? true :false;
    hasLowerCase.value = /[a-z]/.test(password.value);
    hasUpperCase.value = /[A-Z]/.test(password.value);
    hasDigit.value = /\d/.test(password.value);
    isDisabled.value = !(lengthVerify.value && hasLowerCase.value 
    && hasUpperCase.value && hasDigit.value && emailError.value=="");
}


function emailErrorClear(){
    emailError.value = "";
}



function emailVerify(){
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (email.value.search(emailRule) != -1){
        emailError.value = "";
        isDisabled.value = !password.value.length;
    }else{
        emailError.value = "email格式錯誤"
        isDisabled.value = true ;
    }

}

function loginPassword(){
    if(password.value==""){
        isDisabled.value=true;
    }else{
        isDisabled.value=false;
    }
}

function login() {

    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    if (email.value.search(emailRule) != -1) {
        Swal.fire({
                text: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false
            })
        console.log(`email:${email.value}password:${password.value}`)
        let request ={
            "userEmail":email.value,
            "password":password.value
        }
        axios.post("http://localhost:8080/pet/login", request, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response)
            localStorage.setItem('token', response.data.token);
            if(response.data.message=='Login successful'){
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                setTimeout(function () {
                    Swal.close();
                    isLoggedIn.value = false;
                    emits('sendIsLoggedIn', isLoggedIn.value);
                router.push({name:'home'})
                }, 1000);

            }else{
                Swal.fire({
                    icon: "warning",
                    title: response.data.message,
                    allowOutsideClick: false,
                });
            }

        }).catch(function(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "登入失敗",
                text: error.response.data,
            });

        })


    } else {
        console.log("false")
        emailError.value = "email格式錯誤"
    }
}

function signup(){
    Swal.fire({
                text: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false
            })
    let request = {
        "userEmail":email.value,
        "password":password.value
    }
    axios.post("http://localhost:8080/pet/sign" , request , {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function(response){
            console.log(response);
            Swal.fire({
                    icon: "success",
                    title: response.data,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                setTimeout(function () {
                    Swal.close();
                }, 1000);
                setActiveTab('login');
                isDisabled.value=false;
        }).catch(function(error){
            Swal.fire({
                icon: "error",
                title: "登入失敗",
                text: error.response.data,
            });
                })
}
</script>
    
<style>
.text-red {
    color: rgba(250, 79, 79, 0.867);
}
</style>