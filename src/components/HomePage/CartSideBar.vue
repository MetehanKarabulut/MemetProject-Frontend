<template>
    <div class="sidebar" :class="{ open: isOpen }">
        <button class="exit" @click="toggleSidebar">
            <i class="fas fa-times"></i>
        </button>
        <h2>Sepet</h2>
        <hr>

        <table class="cartTable">
            <thead>
                <tr>
                    <th>Ürün</th>
                    <th>Adet</th>
                    <th>Fiyat</th>
                    <th>Toplam</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cartItem, index) in cart" :key="index">
                    <td>{{ cartItem.product.productName }}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-btn" @click="decreaseQuantity(index)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>{{ cartItem.quantity }}</span>
                            <button class="quantity-btn" @click="increaseQuantity(index)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>{{ cartItem.product.price }}₺</td>
                    <td>
                        {{getOneItemPrice(index)}}₺
                    </td>
                </tr>
                <tr class="general-price">
                    <th colspan="3">Genel Toplam:</th>
                    <th colspan="1">{{ getGeneralPrice() }}₺</th>
                </tr>
            </tbody>
        </table>
        <button class="quantity-btn buy-btn" @click="createCart">Satın Al</button>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        cart: {
            type: Array,
            default: JSON.parse(sessionStorage.getItem('cart')) || []
        }
    },data() {
        return {
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        },
        increaseQuantity(index) {
            this.cart[index].quantity++;
            this.$emit('update-cart', this.cart);
            sessionStorage.setItem('cart', JSON.stringify(this.cart))
        },
        decreaseQuantity(index) {
            if (this.cart[index].quantity >= 1) {
                this.cart[index].quantity--;
                this.$emit('update-cart', this.cart);
                sessionStorage.setItem('cart', JSON.stringify(this.cart))
            }
            if(this.cart[index].quantity == 0) {
                this.cart[index].quantity = 0
                this.cart.splice(index, 1)
                this.$emit('update-cart', this.cart);
                sessionStorage.setItem('cart', JSON.stringify(this.cart))
            }
        },
        getOneItemPrice(index){
            return this.cart[index].quantity * this.cart[index].product.price
        },
        getGeneralPrice(){
            var price = 0
            this.cart.forEach(cartItem => {
                price += cartItem.quantity * cartItem.product.price
            });
            return price
        },
        async createCart() {
            var user = JSON.parse(sessionStorage.getItem('user'));
            var date = new Date().toISOString();
            var cartItems = JSON.parse(sessionStorage.getItem('cart'));
            cartItems.forEach(element => {
                delete element.product.productId;
            });

            cartItems.forEach(element => {
                delete element.cartItemId;
            });

            delete user.userId

            var cart = {
                User: user,
                CreatedDate: date,
                CartItems: cartItems
            };

            console.log(cart)

            if (!cart) {
                console.error('Cart not found in session storage.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:5008/cart', cart);
                console.log(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Sunucu hatası:', error.response.status);
                    console.error('Hata mesajı:', error.response.data);
                } else if (error.request) {
                    console.error('Yanıt alınamadı:', error.request);
                } else {
                    console.error('İstek hatası:', error.message);
                }
            }
        }
  }
}
</script>

<style>
body {
    overflow-x: hidden;
}
.sidebar {
    position: fixed !important;
    top: 0;
    right: -55vh;
    width: 40vh;
    height: 100vh;
    background-color: #f8f9fa;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    padding: 20px;
    transition: right 0.3s ease;
    z-index: 3;
}

.cartTable{
    width: 100%;
    border-collapse: collapse;
}

.buy-btn{
    display: flex;
    width:100%;
    height: 5%;
    font-weight: bolder;
    justify-content: center;
    bottom:0
}

.sidebar.open {
    right: -5vmax;
    justify-content: center;
}

.sidebar h2 {
    margin-top: 40px;
    margin-bottom: 25px;
}

.sidebar button.exit {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
}

.cartItemNames {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.CartItems {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-btn {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 3px 3px;
    cursor: pointer;
}

.quantity-btn:first-of-type {
    margin-right: 10px;
}

.quantity-btn:last-of-type {
    margin-left: 10px;
}
</style>
