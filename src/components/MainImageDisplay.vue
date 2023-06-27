<template>
    <div class="main_image_wrapper">
        <div class="main_image_content">
            <div class="close">
                <span  @click="closePopup" >x close </span>
            </div>
            <img :src="image"  @click="closePopup"  />
        </div>
     
    </div>
</template>
<style scoped>
    .main_image_wrapper{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 100vh !important;
       width:100%;
        z-index: 1000;
    }
    .main_image_content{
        background-color: white;
       
        margin: auto;
        max-width: 100%;
        width: 500px;
        height: 100vh;
        display: flex;
        align-items: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: none;
        justify-content: center;
        position: relative;
    }
    .cancel{
        position: absolute;
        right: 0;
        top:0
    }
    .close{
        position: absolute;
        z-index: 1000;
        background: rgb(116, 11, 11);
        top: 10%;
        right: 0;
        color: white;
        font-weight: 200;
        opacity: 1;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
<script>
    export default {
    name:'MainImageDisplay',
        props: {
            image: {
                type: String,
                required: true
            },
            
        },
        methods:{
            closePopup() {
                 this.$emit("close");
            },
        }
    }
</script>