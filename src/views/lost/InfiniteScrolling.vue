<template>
    <div vue-infinite-scroll="loadMore"  :infinite-scroll-disabled="busy"  infinite-scroll-distance="15">
        <li v-for="item in infiniteData" :key="item.id">{{ item.name }}</li>
        </div>
</template>
    
<script setup >
    import { ref , onMounted } from 'vue'
    import cat from '../../common/data.js'
    import infiniteScroll from 'vue-infinite-scroll'
    const count= ref(5); //要推入的資料筆數
    const infiniteData= ref([]);//inifinite scroll渲染的部分
    const busy= ref(false) ; //true觸發載入，false停止載入
    const courses= ref([]) ; //全部的資料
    courses.value=cat
    let x = 0;
        while(x<60){
            infiniteData.value.push(cat[x])
            x++
        }

    function loadMore() {
    console.log("test")
}
</script>

    
<style>
    
</style>