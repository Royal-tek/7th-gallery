<template>
    <Navbar/>
        <!-- Contact Showcase Starts Here -->
        <section class="contact_showcase">

</section>
<!-- Contact Showcase Starts Here -->
        <!-- Main Contact Section Starts Here -->
        <main class="main_contact">
        <div class="main_contact_header">
            <h3>Contact Lisa</h3>
            <p>I will get in touch with you shortly!</p>
        </div>

        <!-- Contact Form Section Starts Here -->
        <form class="main_contact_form">
            <div class="main_contact_name">
                <label class="main_contact_label">Name</label>
                <div class="contact_name_section">
                    <div class="name_col">
                        <input placeholder="First Name" v-model="name" required>
                    </div>
                    <div class="name_col">
                        <input placeholder="Last Name" v-model="lname" required>
                    </div>
                </div>
            </div>

            <div class="email_section">
                <div class="main_contact_email">
                    <label class="main_contact_label">Email Address</label>
                    <div class="email_col">
                        <input type="email" placeholder="Email" v-model="email" required />
                    </div>
                </div>
            </div>

            <div class="message_section">
                <div class="main_contact_message">
                    <label class="main_contact_label">Message</label>
                    <div class="text_col">
                        <textarea rows="10" cols="50" v-model="message"/>

                    </div>
                </div>
            </div>

            <div class="main_contact_button">
                <button @click.prevent="sendEmail">Submit</button>
            </div>
        </form>
        <!-- Contact Form Section Ends Here -->
    </main>

    <!-- Main Contact Section Ends Here -->

    <!-- <ContactSegment/> -->
    <!-- <BehindTheScenes/> -->
</template>

<script>

import Navbar from '../components/Navbar.vue'
import BehindTheScenes from '../components/BehindTheScenes.vue';
import ContactSegment from '../components/ContactSegment.vue';
import emailjs from "@emailjs/browser"
export default {
    name : 'Contact',
    components : {
        ContactSegment, BehindTheScenes, Navbar
    },
    data(){
        return {
            name: '',
            lname: '',
            email: '',
            message: ''
        }
    },
    methods: {
        sendEmail(){
            if(this.fname === '' || this.lname === '' || this.email === '' || this.message === ''){
                alert('No field can be left blank')
                return
            }
            const fd = {
                name: this.name,
                lname: this.lname,
                email: this.email,
                message: this.message
            }
        emailjs.send('service_uexxr8a', 'template_zbdrp6a', fd ,'qaP1FTrAXntqZORIb')
        .then((response)=>{
            this.$swal({
                icon:'success',
                title: 'success',
                text:'EMAIL SENT SUCCESSFULLY',
                
            })
            console.log(response.text);
        }, (error)=>{
            
            this.$swal({
                icon:'error',
                title: 'Failed',
                text:'EMAIL SEND FAILURE',

            })
            console.log(error);
        })
        
    }
    }
}

</script>