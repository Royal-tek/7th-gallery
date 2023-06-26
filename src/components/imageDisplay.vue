<template>
    <div class="back">
        <div class="img-holder">
            <div class="close">
                <i class="fa fa-times">janjdfnjodn</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ViewImage'
}
</script>

<style lang="scss" scoped>
    .back{
        width: 100%;
        height: 100vh;
        position: fixed;
        margin: 0 auto;
        left: 0;
        top: 0;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // background-color: #111;
    }
    .img-holder{
        width: 90%;
        // z-index: 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
        height: 100vh;
        background-color: #fff;
        margin: 0 auto;
        display: flex;

        .close{
            i{
                font-size: 40px !important;
                color: #fff !important;
            }
            
        }
    }
</style>