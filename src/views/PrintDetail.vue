<template>
    <Navbar/>
   <!-- Orignal Prints Starts Here     -->
   <section class="product_details_section" v-if="product"> 
        <div class="product_title">
            <router-link :to="{name : 'Home'}" >Home</router-link>
            <span><img src="/assets/images/tag.svg"></span>
            <a>{{ product.originalCopy.name }}</a>
        </div>
        <div class="product_details">
            <div class="product_image">
                <div class="main_product">
                    <img :src="product.originalCopy.mainImage" />
                </div>
                <div class="product_preview">
                    <div class="product_preview_slot" v-for="(image, index) in product.originalCopy.subImages" :key="index">
                        <img :src="image" />
                    </div>
                    
                    
                </div>
            </div>
            
            <div class="product_description">
                <div class="product_topic">
                    <p>{{ product.originalCopy.name }}</p>
                    <!-- <p>The Pains of my heart</p> -->
                    <small>Print</small>
                </div>
                <div class="main_description">
                    <p>
                        "{{ product.originalCopy.description }}"
                    </p>
                    <div class="description_price">
                        <router-link :to="`/original/${product.originalCopy._id}`">Take me to the original instead</router-link>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="select">
                            <select v-model="selectedDimension" v-on:change="updatePrice" class="form-control">
                                <option value="">Select dimension</option>
                                <option v-for="dim in product.version" :key="dim._id" :value="dim._id">{{ dim.dimensions.width }} x {{ dim.dimensions.height }}</option>
                            </select>
                        </div>
                    </div>
                        <div class="col-4">
                            <div class="select_option">    
                                <input type="number" class="form-control shadow-none" placeholder="Quantity" v-model="selectedQuantity">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="select_option">    
                                <input type="number" class="form-control shadow-none" placeholder="Price" :value="updatePrice">
                            </div>
                        </div>
                    </div>

                    <div class="my-3">
                        <a class="btn addBtn" @click="addToCart(product)">Add to Cart</a>
                    </div>

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
import Navbar from '../components/Navbar.vue';
import ContactSegment from '../components/ContactSegment.vue';
import BehindTheScenes from '../components/BehindTheScenes.vue';
export default {
    name : 'printDetail',
    data(){
        return{
            product : '',
            // selectedPrice : '',
            selectedDimension : '',
            selectedQuantity : ''
        }
    },
    created(){
        this.getProduct()
    },
    components : {
        Navbar, BehindTheScenes, ContactSegment
    },
    computed : {
        updatePrice(){
        const selectedDim = this.product.version.find((dim)=> dim._id === this.selectedDimension)
        if(selectedDim){
            return selectedDim.dimensions.price * this.selectedQuantity
        }else{
            return  null
        }
    }
    },
    methods : {
        async getProduct(){
            const prodId = this.$route.params.id
            const product = await axios.get(`http://localhost:7000/api/product/get-print-product/${prodId}`)
            this.product = product.data
            console.log(product);
        },
        addToCart(prod){
            if(this.selectedQuantity == '' || this.selectedDimension == ''){
                alert("please input quantity and dimension first")
                return;
            }
            const selectedDim = this.product.version.find((dim)=> dim._id === this.selectedDimension)
            if(selectedDim){
                const selectedProd = {
                    id : prod._id,
                    name : prod.originalCopy.name,
                    dimensions : selectedDim,
                    quantity : this.selectedQuantity,
                    mainImage : prod.originalCopy.mainImage,
                    version : 'Print',
                    price : selectedDim.dimensions.price * this.selectedQuantity,
                }
                this.$store.dispatch('addToCart', selectedProd)
            }else {
                console.log('Selected dimension not found');
            }
            
        }
        
    },
    
}
</script>

<style lang="scss" scoped>
    .addBtn{
        background-color: #C16E02;
        color: #fff;
    }
</style>