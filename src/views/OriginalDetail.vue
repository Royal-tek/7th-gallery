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
                <div class="main_product" @click="showImagePopup(product.mainImage)">
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
                    <p class="block">{{  product.name }}</p>
                    <small>Original</small>
                </div>
                <div class="main_description">
                    <p>
                        "{{ product.description }}"
                    </p>
                    <div class="description_price">
                        <p class="price">{{ formatPrice(product.price) }}</p>
                        <router-link v-if="product.printedVersion" :to="`/print/${product.printedVersion._id}`">Take me to the print instead</router-link>

                    </div>
                    <p class="sm-p">Size: {{ product.dimensions.width }} X {{ product.dimensions.height }}</p>

                    <button class="original_button" v-if="!product.soldOut" style="cursor: pointer;" @click="addToCart(product)">Add to Cart</button>
                    <button class="original_button" v-else style="cursor: not-allowed; opacity: .5;" disabled >Sold Out</button>
                    <p style="margin: 15px 0; color: red;" v-if="messageStatus">{{ message }}</p>
                </div>
            </div>
            
        </div>
    </section>

    <MainImageDisplay v-if="showPopup" :image="popupImage" @close="hideImagePopup" />
</template>

<script>
import axios from 'axios'
import ContactSegment from '../components/ContactSegment.vue';
import BehindTheScenes from '../components/BehindTheScenes.vue';
import Navbar from '../components/Navbar.vue';
import popup from '../components/popup.vue';
import MainImageDisplay from '../components/MainImageDisplay.vue';
// import ViewImage from '../components/imageDisplay.vue'
export default {
    name : 'OriginalDetail',
    data(){
        return{
            product : '',
            cartData : [],
            messageStatus : false,
            message : '',
            showPopup:false
        }
    },
    components : {
        Navbar, ContactSegment, BehindTheScenes, popup, MainImageDisplay
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
        showImagePopup(image){
            this.popupImage = image;
            this.showPopup = true
        },
        hideImagePopup() {
            this.showPopup = false;
        },
        async getProduct(){
            const prodId = this.$route.params.id
            const product = await axios.get(`https://server.7thcreator.com/api/product/get-product/${prodId}`)
            this.product = product.data
            console.log(product);
        },
        formatPrice(price){
       
       const numericPrice = Number(price);
       
     
       if (isNaN(numericPrice)) {
         return "";
       }
       
       // Format the price with comma separators
       const formattedPrice = numericPrice.toLocaleString("en-NG", {
         style: "currency",
         currency: "NGN"
       });
       
       // Return the formatted price with the Naira sign
       return formattedPrice.replace("NGN", "₦");
     }
    }
}
</script>
<style  scoped>
    .block{
        font-style: normal !important;
        text-transform: uppercase;
    }
    .original_button{
        padding: 10px 15px !important;
        height: fit-content;
    }
    .main_product{
        cursor:pointer
    }
</style>