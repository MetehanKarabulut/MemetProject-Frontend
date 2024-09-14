<template>
    <div class="homePageGeneral">
        <button @click="goBack" class="back-button" type="button"><i class="fas fa-chevron-left"></i></button>
        <div class="contentPage">    
            <h1>Hopa Memet Steak&Cizz - İletişim</h1>
            <div class="contact-info">
              <p><strong>Adres:</strong> Hopa Terminali / Petrol yanı, 08600 Hopa, Artvin, Türkiye</p>
              <p><strong>Telefon:</strong> 0 532 059 90 08</p>
              <p><strong>E-posta:</strong> metehankarabulut@gmail.com</p>
              <p><strong>Plus Kodu:</strong> 9CP6+QP Hopa, Artvin</p>
              <p><strong><a href="https://www.google.com/maps/place/Mem-Et+Steak%26C%C4%B1zz/@41.387941,41.4142702,17.63z/data=!4m6!3m5!1s0x4067b9f6a2a82a9d:0xb10402ce1b8422b4!8m2!3d41.3869314!4d41.4118516!16s%2Fg%2F11s9xk1qbr?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D"> Konum Linki</a></strong></p>
            </div>


            <h1>Hopa Doğa Restoran - İletişim</h1>
            <div class="contact-info">
              <p><strong>Adres:</strong> Yukarı Kuledibi, Hopa Artvin Yolu No:53, 08690 Koyuncular, Hopa, Artvin, Türkiye</p>
              <p><strong>Telefon:</strong> 0 537 325 0888</p>
              <p><strong>E-posta:</strong> metehankarabulut@gmail.com</p>
              <p><strong>Plus Kodu:</strong> CG28+8C Koyuncular, Hopa/Artvin</p>
              <p><strong><a href="https://www.google.com/maps/place/do%C4%9Fa+restaurant/@41.4026803,41.5051119,15.01z/data=!4m6!3m5!1s0x4067bf2f584abffb:0xad2e9ee35f4607fe!8m2!3d41.4007536!4d41.5160154!16s%2Fg%2F11smlpq0ng?hl=tr-TR&entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D"> Konum Linki</a></strong></p>
            </div>
        

            <h1>Hopa Memet Kasap - İletişim</h1>
            <div class="contact-info">
              <p><strong>Adres:</strong> Hopa Terminali / Petrol yanı, 08600 Hopa, Artvin, Türkiye</p>
              <p><strong>Telefon:</strong> 0 537 325 0888</p>
              <p><strong>E-posta:</strong> mehmetkarabulut@gmail.com</p>
              <p><strong>Plus Kodu:</strong> 9CP6+QP Hopa, Artvin</p>
              <p><strong><a href="https://www.google.com/maps/place/Mem-Et+Steak%26C%C4%B1zz/@41.387941,41.4142702,17.63z/data=!4m6!3m5!1s0x4067b9f6a2a82a9d:0xb10402ce1b8422b4!8m2!3d41.3869314!4d41.4118516!16s%2Fg%2F11s9xk1qbr?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D"> Konum Linki</a></strong></p>
            </div>
        </div>
    </div>
</template>

<script>
import info from '../../data/FirstPage.json';

export default {
    name:'InfoPage',
    data() {
        return {
            info:{}
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    mounted(){
        this.info = info
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

a{
    text-decoration: none;
    color: black;
}

</style>
  