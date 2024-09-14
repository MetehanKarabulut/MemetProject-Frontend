<template>
    <div class="homePageGeneral">
        <button @click="goBack" class="back-button" type="button"><i class="fas fa-chevron-left"></i></button>
        <div class="contentPage">    
            <div class="signupform">
                <label class="formlabel">İsim:</label>
                <input type="text" v-model="name">
            
                <label class="formlabel">Soyad :</label>
                <input type="text" v-model="surname">
            
                <label class="formlabel">Mail :</label>
                <input type="email" v-model="eMail">
            
                <label class="formlabel">Telefon Numarası :</label>
                <input type="tel" v-model="phone" pattern="[0]{1,4}[ ][0-9]{6,14}" placeholder="0(500)-456-78-90">
            
                <button class="" type="button" v-show="userAddress.length > 0" v-for="(address, index) in userAddress" :key="index" @click="removeAddress(index)">
                    {{ address.userAddressTitle }} (Sil)
                </button>
                <button class="address-button" type="button" @click="showAddressBubble">Adres ekle</button>
                <div class="adres" v-show="isAddressButtonClicked" ref="addressBubble">
                    <label class="formlabel">Adres Başlığı :</label>
                    <input type="text" v-model="userAddressTitle">
                    <label class="formlabel">Tam Adres :</label>
                    <input type="text" v-model="userFullAddress">
                    <button type="button" @click="addAddress">Adresi Kaydet</button>
                </div>
            
                <label class="formlabel">Şifre :</label>
                <input type="text" v-model="password">
            
                <button class="submit-button" type="submit" @click.prevent="handleUpdate">Güncelle</button>
            </div>
        </div>
    </div>
</template>

<script>
import {handleClickOutsideComp, addAddressComp, showAddressBubbleComp, removeAddressComp} from '../../composables/FormFunctions'
import axios from 'axios'
export default {
    name:'UserPage',
    data() {
        return {
            user: null,
            name: '',
            surname: '',
            eMail: '',
            phone: '',
            password: '',
            userAddressTitle: '',
            userFullAddress: '',
            userAddress: JSON.parse(sessionStorage.getItem('userAddress')) || [],
            isAddressButtonClicked: false,
        }
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
        async handleUpdate(){
            var updatedUser = {
                FirstName: this.name,
                LastName: this.surname,
                EMail: this.eMail,
                PhoneNumber: this.phone,
                Password: this.password,
                Role: 'user'
            }
            
            let url = `http://localhost:5008/api/User/` + this.user.userId

            try {
                await axios.put(url, updatedUser, {
                headers: {
                "Content-Type": "application/json"
                }
            })
                alert("Kulanici basari ile guncellendi.")
                this.setUser()
                this.fetchUser()
            } catch (error) {
                alert("kullanici guncellenemedi")  
            }
        },
        removeAddress(index) {
            removeAddressComp(index, this.userAddress);
        },
        handleClickOutside(event) {
            handleClickOutsideComp(event, this.$refs.addressBubble, (value) => {
                this.isAddressButtonClicked = value;
            });
        },
        goBack() {
            this.$router.go(-1)
        },
        fetchUser(){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.name = this.user.firstName
            this.surname = this.user.lastName
            this.eMail = this.user.eMail
            this.password = this.user.password
            this.phone = this.user.phoneNumber
            console.log(this.user)
        },
        setUser(){
            let user = JSON.parse(sessionStorage.getItem('user'))
            user.firstName = this.name 
            user.lastName = this.surname
            user.eMail = this.eMail 
            user.password = this.password 
            user.phoneNumber = this.phone 
            sessionStorage.setItem('user', JSON.stringify(user)) 
        },
        async updateUser(){
            let url = `http://localhost:5008/api/User/` + this.user.userId
            delete this.user.userId
            try {
                await axios.put(url, this.user, {
                headers: {
                "Content-Type": "application/json"
                }
            })
                alert("Kulanici basari ile guncellendi.")
            } catch (error) {
                alert("kullanici guncellenemedi")  
            }
        }
    },
    mounted() {
        this.fetchUser()
        this.boundHandleClickOutside = this.handleClickOutside.bind(this);
        document.addEventListener('click', this.boundHandleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.boundHandleClickOutside);
    }
}
</script>

<style scoped>
.contentPage {
    width: fit-content;
    max-height: fit-content;
    margin: auto;
    padding: 40px;
    background: rgba(186, 185, 185, 0.8); 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
    border-radius: 10px; 
    backdrop-filter: blur(10px); 
    justify-items: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.homePageGeneral{
    margin: auto;
    padding: 40px;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: url('../../assets/restoran_arkaplan.jpeg') no-repeat center center;
    background-size: cover;
    display: flexbox;
    flex-direction: column;
}

.back-button{
    background: rgba(154, 153, 153, 0.70);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px 15px 10px 15px;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border-color: rgb(0, 0, 0, 0.5);
    margin-right: 40%;
    margin-bottom: 2%;
}
  
.signupform {
    color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.signupform h2 {
    text-align: center;
    margin-bottom: 10px;
    color: #f0f0f0;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.formlabel {
    margin-bottom: 5px;
    font-weight: bolder;
    font-size: x-large;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
    padding: 10px;
    border-width: 1px;
    border-color: black;
    border-radius: 8px;
    font-size: 16px;
    width: 30vmax;
}

input::placeholder {
    color: black;
}

.addresses-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.addresses-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.address-button {
    font-weight: bolder;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 30px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: background-color 0.3s;
}

.address-button:hover {
    background-color: #45a049;
}

.remove-icon {
    font-weight: bold;
    margin-left: 5px;
}

.add-address-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-address-button:hover {
    background-color: #007bb5;
}

.adres {
    background-color: #fff;
    color: #333;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin-top: 5px;
    display: flex;
    width: 80%;
    position: relative;
    flex-direction: column;
    gap: 15px;
}

.adres input{
    padding: 10px;
    border-width: 1px;
    border-color: black;
    font-size: 16px;
}

.save-address-button {
    align-self: flex-end;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.save-address-button:hover {
    background-color: #45a049;
}

.submit-button {
    background-color: #1e3af0;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.submit-button:hover {
background-color: #4d63e2;
}

@media (max-width: 768px) {
    .contentPage {
        width: 95%;
        padding: 20px;
    }

    .adres {
        width: 100%;
    }
}

</style>
  