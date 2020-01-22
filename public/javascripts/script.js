'use strict';

let app = new Vue({
    el: '#root',
    data: {
        errors: [],
        submitButtonClass: "disabled",
    },

    methods: {
        handleSubmitRegister: function(){
            if (this.submitButtonClass == "disabled"){
                this.errors = [];
                this.errors.push({message:"You must agree to the Terms of Use to register on the website."})
                return false;
            }
            this.errors = [];
            document.querySelector('.register-form').submit();
        },

        toggleRegisterButton: function() {
            let checkbox = document.querySelector('#checkbox');

            if (!checkbox.checked){
                this.submitButtonClass = "disabled";
            } else {
                this.submitButtonClass = "";
            }
        },
    },

    mounted(){
        window.onload = () => {
            document.querySelector('.loadscreen').style.display = "none";
        }
        window.onbeforeunload = () => {
            document.querySelector('.loadscreen').style.display = "flex";
        }
    }
});