<template>
        
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
                    Login/Register
                    </button>



<div class="login">
    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="modal-body">

                    <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a :class="loginActive" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login"    @click="setActiveTab('login')"     aria-selected="true" >Login</a>
                        </li>
                        <li class="nav-item">
                            <a :class="registerActive" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" @click="setActiveTab('register')"   aria-selected="false">Register</a>
                        </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                

                        <div :class="loginFormActive "  id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                            <h5 class="text-center">會員登入</h5>
                            <div class="form-group">
                                <label  for="exampleInputEmail1">Email</label>
                                <input v-model="email"   type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input  v-model="password"  type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <button @click="signin" class="btn btn-primary">登入</button>
                            </div>
                        </div>



        
                        <div :class="registerFormActive" id="pills-register"  role="tabpanel" aria-labelledby="pills-register-tab">
                            <h5 class="text-center">Create New Account</h5>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary">會員註冊</button>
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


import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../../router/router.js';

const email = ref("")
const password = ref("")
const emailError = ref("")
const loginActive=ref('nav-link active');
const registerActive=ref('nav-link')
const loginFormActive=ref('tab-pane fade show active')
const registerFormActive=ref('tab-pane fade')
function setActiveTab(tab){
    // tab-pane fade show active
    if(tab=='login'){
        loginActive.value='nav-link active';
        loginFormActive.value='tab-pane fade show active'
        registerActive.value='nav-link';
        registerFormActive.value='tab-pane fade';
    }else{
        loginActive.value='nav-link';
        loginFormActive.value='tab-pane fade '
        registerActive.value='nav-link active';
        registerFormActive.value='tab-pane fade show active';
    }
}
let vm = this;
function signin() {

    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    if (email.value.search(emailRule) != -1) {
        Swal.fire({
                text: "Loading.....",
                showConfirmButton: false,
                allowOutsideClick: false
            })
        console.log(`email:${email.value}password:${password.value}`)
        let request ={
            "userAccount":email.value,
            "password":password.value
        }
        axios.post("http://localhost:8080/pet/login", request, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response.data)
            if(response.data=='Login successful'){
                Swal.fire({
                    icon: "success",
                    title: response.data,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                setTimeout(function () {
                    Swal.close();
                }, 1000);
                var backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.parentNode.removeChild(backdrop);
                }
                router.push({name:'home'})
            }else{
                Swal.fire({
                    icon: "warning",
                    title: response.data,
                    allowOutsideClick: false,
                });
            }

        }).catch(function(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "登入失敗",
                text: error.data,
            });

        })


    } else {
        console.log("false")
        emailError.value = "email格式錯誤"
    }


}
</script>
    
<style>
    
</style>