<template>
    <!-- <div class="message_wrapper"> -->
        <div class="message_box" v-if="showPopup">
            <p>Product has been added to cart</p>
        </div>
    <!-- </div> -->
</template>

<script>
    export default {
        name:'StatusName',
        props: ['message'],
        computed: {
            showPopup(){
                return this.$store.state.popup
            }
        }
    }
</script>
<style scoped>

    .message_box{
        background: rgb(130, 228, 130);
        width:auto;
        height: 50px;
        padding:10px 40px;
        color: white;
        font-weight: 500;
        position:fixed;
        top:10%;
        border-radius: 10px;
        z-index: 1000000000000000000000000000000;
        right:2%;
        transition: 1s all ease;
    }
</style>