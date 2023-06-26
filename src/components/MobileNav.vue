<template>
    <div class="mobile_nav_link">
        <div class="colapse">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="nav_content">
            <div class="nav_content_branding">
                <h1>The7thcreator</h1>
            </div>
            <div class="nav_content_links">
                <li><router-link :to="{name: 'Originals'}">Original</router-link></li>
                <li><router-link :to="{name: 'Print'}">Prints</router-link></li>
                <li><router-link :to="{name: 'About'}">About Lisa</router-link></li>
                <li class="nav_item"><router-link :to="{name: 'Cart'}"><img src="/assets/images/cart.svg"><sup>{{  cartTotal }}</sup></router-link></li>
            </div>
        </div>
    </div>
</template>

<script>    
export default {
    name : 'MobileNav',
  
    data (){
        return{
            cartData : [],
        }
    },
    
    computed : {
        cartTotal(){
            return this.$store.state.cartTotal
        }
    },
}
</script>