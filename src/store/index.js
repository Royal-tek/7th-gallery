import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    payment : {
      email : '',
      amount : 0,
      state: '',
      country: '',
      fullname: '',
      orderId: '',
      phone: ''
    },
    popup: false,
    publicKey: "pk_test_29bd6557e3d18ca7a57754ce277c776c82f059bf",
    paymentGate : false,
    cartError : '',
    cartTotal : localStorage.getItem('cartTotal') || 0
  },
  mutations: {
    triggerPop(state, status){
      state.popup = status
      setTimeout(() => {
        state.popup = false
      }, 2000);
    },

    updateCartTotal(state, total){
      state.cartTotal = total
      localStorage.setItem('cartTotal', total)
    },

    clearCart(state){
      localStorage.removeItem('cart')
      localStorage.removeItem('cartTotal')
    }

    
  },

  actions: {
    openPaystackPopup(context, ref) {
      const handler = PaystackPop.setup({
      key: context.state.publicKey,
      email: context.state.payment.email,
      amount: context.state.payment.amount * 100,
      ref: ref,
      onClose: this.onCancelledPayment,
      callback: () => context.dispatch('callBack', ref),

    });
    handler.openIframe();
  },

  callBack(context, ref){
    const orderId = context.state.payment.orderId
    axios.get(`http://localhost:7000/api/product/verify/payment/${ref}`)
    .then((res)=>{  
      // window.location = '/'
      const data = {
        fullname: context.state.payment.fullname,
        address: context.state.payment.address,
        state: context.state.payment.state,
        country: context.state.payment.country,
        email: context.state.payment.email,
        phone: context.state.payment.phone
      }
      axios.put(`http://localhost:7000/api/order/update-order/${orderId}`, data)
      .then((res)=>{
        alert('Order has been placed')
        console.log('working');
        context.dispatch('clearCart')
        window.location = '/'
      })
      .catch(err=>console.log(err));

    })
    .catch((err)=>{
        console.log('error',err);
    })
},


    getCartTotal({commit}){
      if(localStorage.getItem('cart')){
        const cart = JSON.parse(localStorage.getItem('cart'))
        const total = cart.length
        commit('updateCartTotal', total)
      }
      else{
        commit('updateCartTotal', 0)
      }
    },

    clearCart({commit}){
      commit('clearCart')
    },

    addToCart({dispatch, commit}, prod) {
      let cartItems = []
      if(localStorage.getItem('cart')) {
        cartItems = localStorage.getItem('cart');
        cartItems = JSON.parse(cartItems);
        const itemIndex = cartItems.findIndex((p) => p.id === prod.id);
        if (itemIndex !== -1) {
          alert('Product is alrady in cart');
        } else {
          cartItems.push(prod);
          
          localStorage.setItem('cart', JSON.stringify(cartItems));
          commit('triggerPop', true)
          dispatch('getCartTotal')
        }
      } else {
        cartItems.push(prod);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        dispatch('getCartTotal')
      }
    },
  },
  modules: {
  }
})
