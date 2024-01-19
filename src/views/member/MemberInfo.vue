<template>
    <div class="formdiv">
        <form>
            <div class="mb-3">
                <label class="form-label" >姓名:</label>
                <input type="email" v-model="userName" class="form-control" >
            </div>
            <div class="mb-3">
                <label class="form-label">帳戶:</label>
                <input type="text" v-model="userAccount" class="form-control" >
            </div>
            <div class="mb-3">
                <label class="form-label">生日:</label>
                <input type="date" v-model="userBirth" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">個人照片:</label>
                <input class="form-control" @change="photo" type="file" id="formFile">
            </div>
            <button type="button" @click="xxx" class="btn btn-primary" >Submit</button>
        </form>
    </div>
</template>
    
<script setup>
import axios from 'axios';
import { ref  } from 'vue'

const userName = ref("")

const userAccount = ref("")
const userBirth = ref("")
const userPhoto = ref("")
const userEmail = ref("")


function photo(event){
    userPhoto.value = event.target.files[0]
}
function xxx(){
    console.log(userBirth.value)
    let request ={
        "userName":"usert",
        "userAccount":"usert",
        "userBirth":"2024-12-04",
        "userPhoto":"photo4"
    }

    const token = localStorage.getItem('token');
    console.log(token);
    axios.put("http://localhost:8080/pet/memberDetail" ,request,{
        headers: {
            'token':token
        },
        }).then(response => {
        console.log(response.data);
        userEmail.value = response.data;
        }).catch(error => {
        console.error(error);
        });
    
}
</script>
    
<style></style>