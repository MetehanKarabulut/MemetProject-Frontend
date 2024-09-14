<template>
    <div class="homePageGeneral">
        <button @click="goBack" class="back-button" type="button"><i class="fas fa-chevron-left"></i></button>
        <div class="contentPage">    
            <div class="" v-if="checkTitle('Doğa Restoran')">
                <p><strong><h1>Hopa Memet Doğa Restoran</h1></strong></p>
                {{restoranContent}}
            </div>
            <div class="" v-if="checkTitle('Memet Kasap')">
                <p><strong><h1>Hopa Memet Kasap</h1></strong></p>
                {{butcherContent}}
            </div>
            <div class="" v-if="checkTitle('Memet Restoran')">
                <p><strong><h1>Hopa Memet SteakHouse</h1></strong></p>
                {{steakHouseContent}}
            </div>
        </div>
    </div>
</template>

<script>
import content from '../../data/FirstPage.json';

export default {
    name:'MainPage',
    data() {
        return {
            info:{},
            restoranContent:'',
            steakHouseContent:'',
            butcherContent:''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        checkTitle(title){
            var user = sessionStorage.getItem(user)
            return JSON.parse(sessionStorage.getItem('title')) === title
        }
    },
    mounted(){
        this.info = content
        this.restoranContent = content.content.restoranContent
        this.steakHouseContent = content.content.steakHouseContent
        this.butcherContent = content.content.butcherContent
    }
}
</script>

<style scoped>
.contentPage {
    width: fit-content;
    max-height: fit-content;
    margin: 0 150px 150px 150px;
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
    margin-right: 90%;
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
  