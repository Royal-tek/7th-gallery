<template>

</template>

<script>
import axios from 'axios'

export default {
    name : 'Payment',

    props:['amount','email'],
    data(){
        return {
            publicKey: "pk_test_29bd6557e3d18ca7a57754ce277c776c82f059bf",
            email: this.email, 
            
        }
    },
    computed : {
        reference(){
            let text = ''
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for( let i=0; i < 10; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            return text
        }
    },
    methods:{
        pay(){
            this.$store.dispatch('openPaystackPopup', this.reference)
        },

        onCancelledPayment(){
            this.$store.state.paymentGate = false
        }
    }
}
</script>

