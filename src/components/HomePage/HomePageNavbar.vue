<template>
    <div class="HomePageNavBar"> 
      <div class="memetlogo"></div>
      <button @click="this.$router.push('/main')">Anasayfa</button>
      <div class="dropdown" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
        <button @click="this.$router.push('/home')">Ürün Kategorileri</button>
        <div v-if="showDropdown" class="dropdown-content">
          <button v-for="(category, index) in categories" :key="index" @click="fetchProductsOfACategory(category.categoryId);this.$router.push('/home')">{{ category.categoryName }}</button>
        </div>
      </div>
      <button @click="this.$router.push('/info')">İletişim</button>
      <button @click="this.$router.push('/user')" v-if="isUserExistsInSession()">Ayarlar</button>
      <button @click="this.$router.push('/admin')" v-if="isUserExistsInSession()&&isUserAdmin()">Yönet</button>
      <button class="cart-button" v-if="isUserExistsInSession()" @click="toggleSidebar">
        <i class="fas fa-shopping-cart"></i>
      </button>
      <CartSideBar :isOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" :cart="cart"/>
    </div>
  </template>
  
  <script>
  import CartSideBar from './CartSideBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      CartSideBar
    },
    props:{
      cart: Array
    },
    data() {
      return {
        isSidebarOpen: false,
        showDropdown: false,
        categories: [],
        productsOfACategory: this.fetchProductsOfACategory(1) || [],
      };
    },
    methods: {
        isUserExistsInSession(){
          const user = JSON.parse(sessionStorage.getItem('user'));
          return user !== null;
        },
        isUserAdmin(){
          const user = JSON.parse(sessionStorage.getItem('user'));
          return user.role === 'admin'
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        async fetchCategories() {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "method":'GET'
                };
                const response = await axios.get('http://localhost:5008/api/category', headers);
                this.categories = response.data;
            } catch (error) {
                console.error("Kategorileri alırken bir hata oluştu:", error);
            }
        },
        async fetchProductsOfACategory(categoryId) {
            try {
                var url = 'http://localhost:5008/category/product/' + categoryId;
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                this.productsOfACategory = response.data;
                this.$emit('update-products', this.productsOfACategory);
            } catch {error => {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Status code:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                }
            }
        },
   
    },
    mounted() {
        this.fetchCategories();
    },
  }
  </script>
  
  <style>
    .memetlogo {
      background-image: url("@/assets/memet_logo.png");
      width: 200px; 
      height: 200px; 
      background-size: contain; 
      background-repeat: no-repeat; 
      background-position: center;
      top: -70%;        
    }
  
    body {
      background-color: #fdf3f3;
    }
  
    .HomePageNavBar {
      padding: 30px;
      max-height: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
      background: rgba(194, 194, 194, 0.592);
      margin: 0 5% 0 5%;
      border-radius: 50px;
      backdrop-filter: blur(10px);
    }
  
    .HomePageNavBar button {
      display: flex;
      background: linear-gradient(135deg, red, grey);
      border-radius: 10px;
      text-decoration: none;
      border-color: transparent;
      color: white;
      padding: 10px 20px;
      justify-items: center;
    }
  
    .HomePageNavBar button:hover {
      background: grey;
      color: black;
    }
  
    .cart-button {
      padding: 20px 30px;
      background: linear-gradient(135deg, red, grey);
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  
    .cart-button:hover {
      background: grey;
    }
  
    .cart-button:hover i {
      color: black;
    }
  
    .cart-button i {
      color: white;
    }
  
    .dropdown {
      position: relative;
    }
  
    .dropdown-content {
      display: inline-flexbox;
      position: absolute;
      background-color: transparent;
      backdrop-filter: blur(40px);
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 4;
      border-radius: 10px;
      padding: 10px 20px;
      text-align: center;
    }
  
    .dropdown-content button {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
  
    .dropdown-content button:hover {
      background-color: grey;
    }
  </style>
  