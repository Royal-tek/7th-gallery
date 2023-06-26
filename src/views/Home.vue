<template>
    <section class="showcase_content">
      <Navbar/>
     
      <section class="showcase_background background1">
            <div class="showcase_background_text">
                <h3>Welcome to </h3>
                <p>The 7th Creator's Art</p>
                <div>
                    <router-link to="/originals" style="color: #fff;">View more</router-link>
                </div>
            </div>
           
        </section>
        </section>
        <section class="main_section">
        <!-- Gallery Section Starts Here -->
    <section class="gallery">
        <div class="section_title" data-aos="zoom-in-right">
            <h3 class="text-uppercase">Where Colors speak louder</h3>
            <!-- <p>Paintings and images crafted by emotions and inspirations from the divine one</p> -->
            <div class="horizontal_rule">
                <img src="/assets/images/heartt.svg" alt="">
            </div>
        </div>

        <div class="gallery_grid">
        
        <div class="grid_image short_length" data-aos="fade-up" v-for="product in products.slice(0, 3)" :key="product.id">
            <div class="main_image" :style="'background-image: url(' + product.mainImage +')'">
                
                <div class="cart">
                    <!-- <a style="cursor: pointer;" @click.prevent="addToCart(product)"> Add to Cart <i class="fa-solid fa-cart-plus"></i></a> -->
                    <router-link :to="`/original/${product._id}`">View Product <i class="fa-solid fa-eye"></i></router-link>
                </div>
            </div>
            
            <div class="product_info">
                <p class="image_title">
                    {{product.name}}
                </p>
                <div class="info_border">
                    <img src="/assets/images/line.svg" />
                </div>
                <!-- <p class="image_price">&#8358;{{ product.price }}</p> -->
            </div>
        </div>

    </div>
    
    </section>

    <!-- Gallery Section Ends Here -->

        <!-- Contact Section Starts Here -->
        <ContactSegment/>
        <!-- Contact Section Ends -->

        

          <!-- Behind The Scene Section Starts Here -->
          <BehindTheScenes/>
         <!-- Behind The Scene Section Ends Here -->
      
    </section>


         

          
    
</template>

<script>
import axios  from 'axios';
import Navbar from '../components/Navbar.vue'
import ContactSegment from '../components/ContactSegment.vue';
import BehindTheScenes from '../components/BehindTheScenes.vue';
export default {
  name: 'Home',
  components: {
    Navbar, ContactSegment, BehindTheScenes
  },
  data(){
    return{
        products : []
    }
},
  created(){
    this.getAllProducts()
},
  methods : {
    addToCart(prod){
            let selectedProd = {
                    id : prod._id,
                    name : prod.name,
                    mainImage : prod.mainImage,
                    version : 'Original',
                    price : prod.price,
                }
            this.$store.dispatch('addToCart', selectedProd)
                
        },
    
    async getAllProducts(){
        const response = await axios.get('http://localhost:7000/api/product/get-all-products')
        const products = response.data.reverse(); // Reverse the order of products
        console.log(products.data);
        this.products = products
    }
}
}
</script>
