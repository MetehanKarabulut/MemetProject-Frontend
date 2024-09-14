<template>   
  <div class="homePageGeneral">
    <div>
      <HomePageNavbar class="navbar" @update-products="updateProducts"  :cart="cart"/>
    </div>
    <div>
      <HomePageMain :products="products" :cart="cart" @update-cart="updateCart"/>
    </div>
  </div>
</template>

<script>
import HomePageNavbar from '@/components/HomePage/HomePageNavbar.vue'
import HomePageMain from '@/components/HomePage/HomePageMain.vue'
export default {
    name:'Homepage',
    components:{
        HomePageNavbar,
        HomePageMain
    }, 
    data() {
        return {
            products: [],
            cart: []
        };
    },
    methods: {
        updateProducts(products) {
            this.products = products;
        },
        updateCart(cart){
          this.cart = cart
        }
    }
}
</script>

<style scoped>
  .homePageGeneral{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: url('../assets/restoran_arkaplan.jpeg') no-repeat center center;
    background-size: cover;
    display: flexbox;
    flex-direction: column;
  }

  .navbar{
    z-index: 3;
  }
  
</style>