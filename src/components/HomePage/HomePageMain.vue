<template>
  <div class="contentPage">    
    <div class="product-list">
      <div class="product" v-for="(product, index) in products" :key="index">
        <img :src="product.image" alt="Ürün Resmi" class="product-image" />
        <div class="product-details">
          <h3>{{ product.productName }}</h3>
          <p>Fiyat: {{ product.price }}₺</p>
          <div class="quantity-controls" v-if="userExistsInSession()">
            <button class="minus-button" @click="decreaseQuantity(product.productId)" :disabled="getQuantity(product.productId) <= 1">-</button>
            <div>{{ getQuantity(product.productId) }}</div>
            <button @click="increaseQuantity(product.productId)">+</button>
          </div>
        </div>
        <button v-if="userExistsInSession()" @click="addToCart(product)" class="add-button">Ekle</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    products: Array
  },
  data() {
    return {
      quantities: new Map(),
      cart:[]
    };
  },
  created() {
    this.initQuantities();
  },
  methods: {
    initQuantities() {
      this.products.forEach(product => {
        this.quantities.set(product.productId, 0);
      });
    },
    userExistsInSession(){
      const user = JSON.parse(sessionStorage.getItem('user'));
      return user !== null;
    },
    getQuantity(productId) {
      return this.quantities.get(productId) || 0;
    },
    increaseQuantity(productId) {
      const currentQuantity = this.quantities.get(productId) || 0;
      this.quantities.set(productId, currentQuantity + 1);
    },
    decreaseQuantity(productId) {
      const currentQuantity = this.quantities.get(productId) || 0;
      if (currentQuantity > 1) {
        this.quantities.set(productId, currentQuantity - 1);
      }
    },
    async addToCart(product) {
      try {
        var Id = product.productId;
        if (!product || !Id) {
          throw new Error("Geçersiz ürün veya ürün kimliği bulunamadı.");
        }

        let productQuantity = this.quantities.get(Id);
        if (!productQuantity || productQuantity < 1) {
          throw new Error("Geçerli bir ürün miktarı girin.");
        }

        const url = 'http://localhost:5008/cartItem';
        var cartItem = {
          product: product,
          quantity: productQuantity
        };

        var response = await axios.post(url, cartItem, {
          headers: { 'Content-Type': 'application/json' },
          params: {
            Id,
            quantity: productQuantity
          }
        });

        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Sunucu hatası: ${response.status}`);
        }

        if (!response.data || typeof response.data !== 'object') {
          throw new Error("Sunucudan geçersiz veri alındı.");
        }

        cartItem = response.data;
        cartItem.product = product;
        var existingProduct = this.cart.find(c => c.product.productName === product.productName);

        if (existingProduct) {
          existingProduct.quantity += productQuantity;
        } else {
          this.cart.push(cartItem);
        }
        sessionStorage.setItem('cart', JSON.stringify(this.cart)  )
        this.$emit('update-cart', this.cart);

      } catch (error) {
        console.error("Sepete ekleme hatası:", error.message);
        alert(`Ürün sepete eklenirken hata oluştu: ${error.message}`);
      }
    }
  }
};
</script>

<style scoped>
.contentPage {
  width: 80%;
  height: 100vh;
  margin: 25px auto 0 auto;
  padding: 20px;
  background: rgba(154, 153, 153, 0.70); 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
  border-radius: 10px; 
  backdrop-filter: blur(10px); 
  align-items: start;
}

.product-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: rgb(248, 237, 237, 0.6);
  backdrop-filter: blur(10px);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}

.product-details {
  flex: 1;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-controls button span{
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}

.quantity-controls button:disabled {
  cursor: not-allowed;
  background-color: #e0e0e0;
}

.add-button {
  background: linear-gradient(135deg, red, grey);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.add-button:hover{
  background: grey;
  color: black;
}

</style>
