<template>
    <popup v-if="messageStatus" :message="message"/>
    <Navbar/>
        <!-- Orignal Prints Starts Here     -->
        <section class="product_details_section"> 
            <!-- <ViewImage/> -->

        <div class="product_title">
            <router-link to="/" >Home</router-link>
            <span><img src="/assets/images/tag.svg"></span>
            <a>"{{ product.name }}"</a>
        </div>
        <div class="product_details">
            <div class="product_image">
                <div class="main_product">
                    <img :src="product.mainImage" />
                </div>
            <div class="product_preview">
                <div class="product_preview_slot" v-for="(image, index) in product.subImages" :key="index">
                    <img :src="image" />
                </div>              
            </div>
            </div>
            <div class="product_description">
                <div class="product_topic">
                    <p class="text-capitalize">{{  product.name }}</p>
                    <small>Original</small>
                </div>
                <div class="main_description">
                    <p>
                        "{{ product.description }}"
                    </p>
                    <div class="description_price">
                        <p class="price">&#8358;{{ product.price }}</p>
                        <router-link v-if="product.printedVersion" :to="`/print/${product.printedVersion._id}`">Take me to the print instead</router-link>

                    </div>
                    <p class="sm-p">Size: {{ product.dimensions.width }} X {{ product.dimensions.height }}</p>

                    <button v-if="!product.soldOut" style="cursor: pointer;" @click="addToCart(product)">Add to Cart</button>
                    <button v-else style="cursor: not-allowed; opacity: .5;" disabled >Sold Out</button>
                    <p style="margin: 15px 0; color: red;" v-if="messageStatus">{{ message }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Orignal Prints Ends Here     -->

    <!-- Contact Section Starts Here -->
    <!-- <ContactSegment/> -->

    <!-- Contact Section Ends -->

    <!-- Behind The Scene Section Starts Here -->
    <!-- <BehindTheScenes/> -->
</template>

<script>
import axios from 'axios'
import ContactSegment from '../components/ContactSegment.vue';
import BehindTheScenes from '../components/BehindTheScenes.vue';
import Navbar from '../components/Navbar.vue';
import popup from '../components/popup.vue';
// import ViewImage from '../components/imageDisplay.vue'
export default {
    name : 'OriginalDetail',
    data(){
        return{
            product : '',
            cartData : [],
            messageStatus : false,
            message : ''
        }
    },
    components : {
        Navbar, ContactSegment, BehindTheScenes, popup
    },
    created () {
        this.getProduct()
    },
    methods : {
        addToCart(prod){
            const selectedProd = {
                    id : prod._id,
                    name : prod.name,
                    mainImage : prod.mainImage,
                    version : 'Original',
                    price : prod.price,
                }
            this.$store.dispatch('addToCart', selectedProd)
            
        },
        async getProduct(){
            const prodId = this.$route.params.id
            const product = await axios.get(`http://localhost:7000/api/product/get-product/${prodId}`)
            this.product = product.data
            console.log(product);
        }
    }
}
</script>