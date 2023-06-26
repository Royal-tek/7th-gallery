<template>
    <header class="checkout_header">
        <router-link :to="{name : 'Home'}">The 7thcreator</router-link>
    </header>

    <section class="checkout_wrapper">
        <div class="checkout_section" data-aos="zoom-in-right">
            <div class="payment_options">
                
                <!-- EMAIL PART -->
                <div id="email_card" class="card email_section" >
                    <div class="email_card_header" data-aos="zoom-in-right">
                        <h3>1.</h3>
                        <h3>Your Email </h3>
                    </div>
                    <div class="email_field">
                        <div class="email_input">
                            <input type="email" placeholder="Email" v-model="userInfo.email" />
                        </div>
    
                        <p>You’ll receive a receipt of order and notifications when placed</p>
                        <button class="primary_btn" @click="sendEmail">Continue</button>
                    </div>
                </div>

                <!-- DELIVERY PART -->
                <div id="delivery_card" class="delivery_card">
                    <div class="delivery_card_header" data-aos="zoom-in-right">
                        <h3>2.</h3>
                        <h3>Delivery Address</h3>
                    </div>
                    <div class="delivery_card_input">
                        <div class="delivery_input_field">
                            <input type="text" placeholder="Full Name" v-model="userInfo.fullname" />
                        </div>
                        <div class="delivery_input_field">
                            <input type="tel" placeholder="Phone Number" v-model="userInfo.phone" />
                        </div>
                        <div class="delivery_input_field">
                            <input type="text" placeholder="Address" v-model="userInfo.address" />
                        </div>
                        <div class="delivery_input_field">
                            <div class="select_field">
                                <select v-model="userInfo.country">
                                    <option value="">Country</option>
                                    <option value="nigeria">Nigeria</option>
                                </select>
                            </div>
                            
                        </div>
                        <div class="delivery_input_field">
                            <div class="select_field">
                                <select v-model="userInfo.selectedState">
                                    <option value="">State</option>
                                    <option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
                                </select>
                            </div>
                            
                        </div>
                        <div class="delivery_button">
                            <button @click.prevent="sendDetails">Continue</button>
                        </div>
                    </div>
                </div>


                <div id="payment_card" class="delivery_card" data-aos="zoom-in-right">
                    <div class="delivery_card_header final_payment_header">
                        <h3>3.</h3>
                        <h3> Payment</h3>
                    </div>
                    <div class="payment_card_input">

                        <div class="payment_button">
                            <button  @click="makePay">Make Payment</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="card payment_summary" data-aos="zoom-in-left">
                <h3>Order Summary</h3>
                <div class="order_info">
                    
                <div class="order_info" >
                    <div class="order" v-for="(prod, index) in products" :key="index">
                        <div class="order_image">
                            
                            <img :src="prod.mainImage"/>
                        </div>
                        <div class="order_main_info">
                            <p class="order_name">{{prod.name}}</p>
                            <!-- <p class="order_quamtity">
                                Qty:<span class="qty">2</span>
                            </p> -->
                            <p class="order_price">	&#8358;{{ prod.price }}</p>
                            
                        </div>
                    </div>
                    
                    
                
                    <div class="order_total" style="font-weight: bold;">
                        <p class="total">Price: </p> 
                        <p class="total_price">	&#8358;{{ total }}</p>
                </div> 
                <div class="order_total" style="font-weight: bold;">
                        <p class="total">Delivery: </p> 
                        <p class="total_price">	&#8358;{{ delivery }}</p>
                </div> 
                <div class="order_total" style="font-weight: bold;">
                        <p class="total">Total: </p> 
                        <p class="total_price">	&#8358;{{ getTotal }}</p>
                </div> 
            </div>
        </div>
        </div>
        </div>
    </section>

</template>

<script>
import axios from 'axios'
export default {
    name : 'CheckOut',
    data(){
        return{
            userInfo : {
                email : '',
                fullname : '',
                address : '',
                country : '',
                selectedState : '',
                orderId: '',
                phone: ''
            },
            emailCheck: false,
            detailCheck: false,
            products : [],
            total : 0,
            delivery: 0,
            status : '',
            states: [
                "Abia",
                "Adamawa",
                "Akwa Ibom",
                "Anambra",
                "Bauchi",
                "Bayelsa",
                "Benue",
                "Borno",
                "Cross River",
                "Delta",
                "Ebonyi",
                "Edo",
                "Ekiti",
                "Enugu",
                "Gombe",
                "Imo",
                "Jigawa",
                "Kaduna",
                "Kano",
                "Katsina",
                "Kebbi",
                "Kogi",
                "Kwara",
                "Lagos",
                "Nasarawa",
                "Niger",
                "Ogun",
                "Ondo",
                "Osun",
                "Oyo",
                "Plateau",
                "Rivers",
                "Sokoto",
                "Taraba",
                "Yobe",
                "Zamfara"
            ]


        }
    },
     created(){
         this.getCheckOutOrder()
        this.$store.state.payment.orderId = this.$route.params.orderId

    },
    computed:{
        reference(){
            let text = ''
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for( let i=0; i < 10; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            return text
        },
        getTotal(){
            return this.total + this.delivery
        }
    },
    methods : {
        
        sendEmail(){
            if(this.userInfo.email == ''){
                alert('Email cannot be left blank!')
                return;
            }
            this.$store.state.payment.email = this.userInfo.email;
            this.emailCheck = true
            alert('Email saved!')
        },
        sendDetails(){
            if(this.userInfo.state == '' || this.userInfo.country == '' || this.userInfo.fullname == '' || this.userInfo.address == ''){
                alert('No field can be left blank')
                return;
            }
            this.$store.state.payment.state = this.userInfo.selectedState;
            this.$store.state.payment.country = this.userInfo.country;
            this.$store.state.payment.fullname = this.userInfo.fullname;
            this.$store.state.payment.address = this.userInfo.address;
            this.$store.state.payment.phone = this.userInfo.phone;
            this.detailCheck = true

            if(this.userInfo.selectedState === 'Lagos'){
                this.delivery = 3000
            }
            else if(this.userInfo.selectedState !== 'Lagos'){
                this.delivery = 5000
            }

            alert('Details saved!')

        },
        makePay(){
            if(!this.emailCheck || !this.detailCheck){
                alert("Please fill all information needed")
                return;
            }
            this.$store.state.payment.amount = this.getTotal
            this.$store.dispatch('openPaystackPopup', this.reference)
        },
        async getCheckOutOrder(){
            const orderId = this.$route.params.orderId
            
            try {
                const getOrder = await axios.get(`http://localhost:7000/api/order/get-order/${orderId}`)
                this.orders = getOrder.data
                this.total = getOrder.data.total
                this.status = getOrder.data.status
                this.products = getOrder.data.products
                console.log(getOrder.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>   