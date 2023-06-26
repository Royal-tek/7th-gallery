<template>
    <Navbar/>
    
        <!-- Cart Section Starts Here -->
        <div class="page_title">
        <p>Shopping Cart</p>
    </div>
    <section class="cart_section">
        <div class="cart_details">
            <table class="table table-hover" v-if="cartData.length !== 0">
  <thead class="thead-dark ">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Version</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(product, index) in cartData" :key="product.id">
      <th scope="row">{{index + 1}}</th>
      <td>
        <img style="width: 70px !important; border-radius: 50%;" :src="product.mainImage">
      </td>
      <td class="text-capitalize">{{ product.name }}</td>
      <td>{{ product.version }}</td>
      <td>{{ product.price }}</td>
      <td>
        <span style="cursor:pointer" @click="removeFromCart(product)"><img src="/assets/images/multiply.svg"></span>
      </td>
    </tr>

  </tbody>
</table>
<h4 v-else>There is no item in your cart</h4>
        </div>
        
        <div class="lower_section">
            <div class="cart_total">
                <div class="cart_total_section">
                    <div>Subtotal</div>
                    <div class="cart_total_price">&#8358;{{ getTotalAmount }}</div>
                </div>
                <button class="cart_btn" @click="makepay">Checkout</button>
            </div>
        </div>
        
    </section>
</template>

<script>
import axios from 'axios'
import Payment from '../components/Payment.vue'
import BehindTheScenes from '../components/BehindTheScenes.vue'
import ContactSegment from '../components/ContactSegment.vue'
import Navbar from '../components/Navbar.vue'
export default {
    name : 'Cart',
    data(){
        return {
            cartData : [],
            message : '',
            messageStatus : false,
            cartTotal : 0,
            amount: ''
            
        }
    },
    
    components : {
        Navbar, BehindTheScenes, ContactSegment, Payment
    },
    created(){
        this.getCart()
    },
    computed : {
        getPaymentGateStatus(){
            return this.$store.state.paymentGate
        },
        getTotalAmount(){
            this.amount = this.cartData.reduce((a,b) => a+b.price, 0)
            return this.cartData.reduce((a,b) => a+b.price, 0)
        }
    },
    methods : {
        async makepay(){
            if(this.cartData == '' || this.amount == ''){
                alert('Cart is empty')
                return
            }
            const cart = {
                products : this.cartData,
                total : this.amount
            }
            try {
                const createOrder = await axios.post('http://localhost:7000/api/order/create-order', cart)
                const orderId = createOrder.data._id
                window.location.href = `/checkout/${orderId}`;

                // this.$router.push(`/checkout/${orderId}`);
            } catch (error) {
                console.log(error);
            }
        },
        
        getCart(){
            if(localStorage.getItem('cart')){
                this.cartData = localStorage.getItem('cart')
                this.cartData = JSON.parse(this.cartData)
                console.log(this.cartData);
            }else{
                this.messageStatus = true
                this.message = 'There is no item in your cart'
            }
        },
        removeFromCart(prod){
            if(localStorage.getItem('cart')){
                this.cartData = localStorage.getItem('cart')
                this.cartData = JSON.parse(this.cartData)
                const productIndex = this.cartData.findIndex((p)=> p.id === prod.id)
                if(productIndex !== -1){
                    this.cartData.splice(productIndex, 1)
                    localStorage.setItem('cart', JSON.stringify(this.cartData))
                    this.$store.dispatch('getCartTotal')
                    this.getCart()
                }else{
                    console.log('Product is not in cart');
                }
            }
        },
        
    }
}
</script>