<template>
    <label class="formlabel">İsim :</label>
    <input type="text" v-model="name">

    <label class="formlabel">Soyad :</label>
    <input type="text" v-model="surname">

    <label class="formlabel">E-Mail :</label>
    <input type="email" v-model="eMail">

    <label class="formlabel">Telefon Numarası :</label>
    <input type="tel" v-model="phone" pattern="[0]{1,4}[ ][0-9]{6,14}" placeholder="0(500)-456-78-90">

    <button class="" type="button" v-show="userAddress.length > 0" v-for="(address, index) in userAddress" :key="index" @click="removeAddress(index)">
        {{ address.userAddressTitle }} (Sil)
    </button>
    <button class="fas fa-plus addressAddingButton" type="button" @click="showAddressBubble">Adres ekle</button>
    <div class="adres" v-show="isAddressButtonClicked" ref="addressBubble">
        <label class="formlabel">Adres Başlığı :</label>
        <input type="text" v-model="userAddressTitle">
        <label class="formlabel">Tam Adres :</label>
        <input type="text" v-model="userFullAddress">
        <button type="button" @click="addAddress">Adresi Kaydet</button>
    </div>

    <label class="formlabel">Şifre :</label>
    <input type="password" v-model="password1">

    <label class="formlabel">Şifre Tekrar :</label>
    <input type="password" v-model="password2">

    <button type="submit" @click="handleSignUp()">Sign Up</button>

    <button @click="this.$router.push('/login')" class="loginbutton">Giriş Sayfası</button>
</template>


<script>
import {handleClickOutsideComp, handleSignUpComp, addAddressComp, showAddressBubbleComp, removeAddressComp} from '../../composables/FormFunctions'

export default {
    name: 'SignUpPageForm',
    data() {
        return {
            name: '',
            surname: '',
            eMail: '',
            phone: '',
            password1: '',
            password2: '',
            userAddressTitle: '',
            userFullAddress: '',
            userAddress: JSON.parse(sessionStorage.getItem('userAddress')) || [],
            isAddressButtonClicked: false
        };
    },
    methods: {
        addAddress(){
            var result = addAddressComp(this.userAddressTitle, this.userFullAddress, this.userAddress)
            if(result){
                this.userAddress = result.userAddress
                this.isAddressButtonClicked = result.isAddressButtonClicked
            }
        },
        showAddressBubble(){
            this.isAddressButtonClicked = showAddressBubbleComp(this.isAddressButtonClicked)
        },
        handleSignUp(){
            const userData = {
                name: this.name,
                surname: this.surname,
                eMail: this.eMail,
                phone: this.phone,
                password1: this.password1,
                password2: this.password2
            };

            handleSignUpComp(userData, this.$router);
        },
        removeAddress(index) {
            removeAddressComp(index, this.userAddress);
        },
        handleClickOutside(event) {
            handleClickOutsideComp(event, this.$refs.addressBubble, (value) => {
                this.isAddressButtonClicked = value;
            });
        }
    },
    mounted() {
        this.boundHandleClickOutside = this.handleClickOutside.bind(this);
        document.addEventListener('click', this.boundHandleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.boundHandleClickOutside);
    }
};
</script>

<style scoped>
.addressAddingButton{
    position: relative;
    margin-bottom: 15px;
}
.adres{
    position:absolute;
    padding: 15px;
    width: 30%;
    justify-content: center;
    display: inline-flexbox;
    border-style: solid;
    border-width: 1px;
    border-radius: 50px;
    margin-bottom: 15px;
    background-color: white;
}

.loginbutton{
    background: white;
    color: black;
    width: fit-content;
    height: fit-content;
    text-decoration: underline;
}

.loginbutton:hover{
    background: white;
    color: rgb(60, 60, 252);
}

label{
    font-weight: bolder;
}
</style>
