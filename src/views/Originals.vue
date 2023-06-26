<template>
 
    <!-- SHOWCASE CONTENT BEGINS HERE -->
    <section class="showcase_content">
        
        <Navbar/>
        <section class="showcase_background background2">
            <div class="showcase_background_text">
                <h3>The Originals</h3>
  
                <!-- <div>
                    <a>View more</a>
                </div> -->
           
            </div>
           
        </section>

    </section>
    
    <!-- SHOWCASE CONTENT ENDS HERE -->

        <!-- Gallery Section Starts Here -->
        <section class="gallery">
        <div class="section_title" data-aos="zoom-in-right">
            <h3 class="text-uppercase">Let the cart be filled with art</h3> <!-- PENDING-->
            <!-- <p>Paintings and images crafted by emotions and inspirations from the divine one</p> -->
            <div class="horizontal_rule">
                <img src="/assets/images/heartt.svg" alt="">
            </div>
        </div>

        <div class="gallery_grid">
        
            <div class="grid_image short_length" data-aos="fade-up" v-for="product in products" :key="product.id">
                <div class="main_image" :style="'background-image: url(' + product.mainImage +')'">
                    
                    <div class="cart">
                        <div>
                            <a v-if="!product.soldOut" style="cursor: pointer;" @click.prevent="addToCart(product)"> Add to Cart <i class="fa-solid fa-cart-plus"></i></a>
                            <a v-else style=" opacity: .5;"> Sold Out </a>
                        </div>
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
                    <p class="image_price">&#8358;{{ product.price }}</p>
                </div>
            </div>

        </div>
    
    </section>

    <!-- Gallery Section Ends Here -->

    <ContactSegment/>

    <!-- <BehindTheScenes/> -->



</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import ContactSegment from '../components/ContactSegment.vue'
import BehindTheScenes from '../components/BehindTheScenes.vue'
export default {
name: 'Originals',
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
        const products = await axios.get('http://localhost:7000/api/product/get-all-products')
        console.log(products.data);
        this.products = products.data.reverse()
    }
}

}
</script>
