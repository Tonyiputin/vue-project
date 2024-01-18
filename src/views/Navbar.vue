<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" :to="{ name: 'home' }">PetParadise</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>




            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">

                    <li class="nav-item dropdown">
                        <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            通報
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'lost' }">遺失</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'infiniteScrolling' }">測試滾動</RouterLink>
                            </li>
                        </ul>
                    </li>



                    <li class="nav-item dropdown">
                        <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                    <div><loginRegister @send-is-logged-in="getIsLoggedInFromComponent" @send-user-email="getUserEmail"></loginRegister></div>
                        </a>
                        <ul class="dropdown-menu" v-if="!isLoggedIn" >
                            <!--  -->
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'memberInfo' }">會員中心</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'infiniteScrolling' }">登出</RouterLink>
                            </li>
                        </ul>
                    </li>





                    
                </ul><!-- navbar -->
            </div>
        </div>
        <h2>{{ email }}</h2>



    </nav>
    <RouterView></RouterView>

</template>
    
<script setup >
import loginRegister from './member/LoginRegister.vue'
import { ref } from 'vue';
const isLoggedIn = ref(true);
const email = ref("");

function getIsLoggedInFromComponent (data){
    isLoggedIn.value = data
    
}
function getUserEmail(data){
    email.value = data
}
</script>
    
<style>
.dropdown-menu li:hover .sub-menu {visibility: visible;}
.dropdown:hover .dropdown-menu {display: block;}
</style>