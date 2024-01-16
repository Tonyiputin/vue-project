<template>
    <div class="formdiv">
        <form>
            <h2 style="text-align:center">會員登入</h2>
            <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" v-model="email">
                    <span style="color:red">{{ emailError }}</span>
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" v-model="password">
                    <span>{{ passwordError }}</span>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-10 offset-sm-2">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck1">
                        <label class="form-check-label" for="gridCheck1">
                            Example checkbox
                        </label>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-secondary " @click="signin" style="width:100%">登入</button>
            <div class="row">
                <div class="col" style="text-align:center">
                    <RouterLink class="rl" :to="{ name: 'signin' }">會員註冊</RouterLink>
                </div>
                <div class="col" style="text-align:center">
                    <RouterLink class="rl" :to="{ name: 'forgetPassword' }">忘記密碼</RouterLink>
                </div>
            </div>
        </form>
    </div>
    <RouterView></RouterView>
</template>
    
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../../router/router.js';

const email = ref("")
const password = ref("")
const emailError = ref("")
const passwordError = ref("")

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
.rl {
    text-decoration: none;
}

.formdiv {
    border: 1px groove #9D9D9D;
    padding: 50px;
    border-radius: 15px;
    max-width: 60%;
    margin: auto;
    margin-top: 5%
}
</style>