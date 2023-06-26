<template>

<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
<div class="new_branding">
                    <a href="/">The7thcreator</a>
                </div>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item  mx-3">
       <router-link class="nav-link" :to="{name: 'Originals'}"><h5 class="text-dark">Original</h5></router-link>
      </li>
      <li class="nav-item mx-3">
        <router-link class="nav-link" :to="{name: 'Print'}"><h5 class="text-dark">Prints</h5></router-link>
      </li>
      <li class="nav-item mx-3">
        <router-link class="nav-link" :to="{name: 'About'}"><h5 class="text-dark">About</h5></router-link>
      </li>
      <li class="nav-item mx-3">
        <router-link class="nav-link" :to="{name: 'Cart'}"><img src="/assets/images/cart.svg"><sup>{{  cartTotal }}</sup></router-link>
      </li>
    </ul>
  </div>
</div>
</nav>
        
        <!-- Navbar Ends Here -->
</template>

<script>
export default {
    name : 'Navbar',
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