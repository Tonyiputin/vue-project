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
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
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
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'loginregister' }">測試登入註冊</RouterLink>
                            </li>
                        </ul>
                    </li>



                    <li class="nav-item" style="text-align:left;">
                        <RouterLink class="nav-link" :to="{ name: 'login' }">會員登入</RouterLink>
                    </li>


                    
                </ul><!-- navbar -->
            </div>
        </div>



    </nav>
    <RouterView></RouterView>
</template>
    
<script setup >

</script>
    
<style></style>