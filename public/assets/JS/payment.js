// Javascript For Payment Page Starts Here
let mailCard = document.querySelector('#email_card');
let deliveryCard = document.querySelector('#delivery_card');
let paymentCard = document.querySelector('#payment_card');
let emailHeader = document.querySelector('.email_card_header');
let deliveryHeader = document.querySelector('.delivery_card_header');
let paymentHeader = document.querySelector('.final_payment_header')
emailHeader.addEventListener('click' ,() =>{
    mailCard.classList.add('reset')
})
deliveryHeader.addEventListener('click' , ()=>{
    deliveryCard.classList.add('reset')
})

paymentHeader.addEventListener('click' , () =>{
    paymentCard.classList.add('reset')
})