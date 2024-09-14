<template>
  <div class="homePageGeneral">
    <button @click="goBack" class="back-button" type="button"><i class="fas fa-chevron-left"></i></button>
    <div class="contentPage">
      <div class="admin-navbar">
        <button class="admin-nav-button" type="button" @click="openCategorySection"> Kategori </button>
        <button class="admin-nav-button" type="button" @click="openProductSection"> Ürün </button>
        <button class="admin-nav-button" type="button" @click="openUserSection"> Kullanıcı </button>
      </div>
      <div class="crud-section" v-if="isCategorySectionOpen">
        <h2>Kategorileri Yönet</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kategori Adı</th>
              <th>Açıklama</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody v-for="(category, index) in categories" :key="index">
            <tr>
              <td><input disabled v-model="category.categoryId"> </td>
              <td><input v-model="category.categoryName"> </td>
              <td><input v-model="category.description"> </td>
              <td>
                <button class="update-button" @click="UpdateCategory(category)">Güncelle</button>
                <button class="delete-button" @click="DeleteCategory(category.categoryId)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="crud-section" v-if="isProductSectionOpen">
        <h2>Ürünleri Yönet</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün Adı</th>
              <th>Açıklama</th>
              <th>Fiyat</th>
              <th>Stok Durumu</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody v-for="(product, index) in products" :key="index">
            <tr>              
              <td><input disabled v-model="product.productId"> </td>
              <td><input v-model="product.productName"> </td>
              <td><input v-model="product.description"> </td>
              <td><input v-model="product.price"> </td>
              <td>
                <select v-model="product.stockControl" id="options" name="option">
                  <option :value="true">Var</option>
                  <option :value="false">Yok</option>
                </select> 
              </td>
              <td>
                <button class="update-button" @click="UpdateProduct(product)">Güncelle</button>
                <button class="delete-button" @click="DeleteProduct(product.productId)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="crud-section" v-if="isUserSectionOpen">
        <h2>Kullanıcıları Yönet</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Soyad</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Rol</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          
          <tbody v-for="(user, index) in users" :key="index">
            <tr>
              <td><input disabled v-model="user.userId"></td>
              <td><input v-model="user.firstName"> </td>
              <td><input v-model="user.lastName"> </td>
              <td><input v-model="user.eMail"> </td>
              <td><input v-model="user.phoneNumber"> </td>
              <td><input v-model="user.role"> </td>
              <td>
                <button class="update-button" @click="UpdateUser(user)">Güncelle</button>
                <button class="delete-button" @click="DeleteUser(user.userId)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPage',
  data() {
    return {
      categories:[],
      products:[],
      users:[],
      isCategorySectionOpen:false,
      isProductSectionOpen:false,
      isUserSectionOpen:true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
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
    async fetchProducts(){
      try {
        const headers = {
            "Content-Type": "application/json",
            "method":'GET'
        };
        const response = await axios.get('http://localhost:5008/api/Product', headers);
        this.products = response.data;
        this.products = this.products.filter((product, index, self) =>
            index === self.findIndex((p) => p.productName === product.productName)
          );
      } catch (error) {
        console.error("Ürünleri alırken bir hata oluştu:", error);
      }
    },
    async fetchUsers(){
      try {
        const headers = {
            "Content-Type": "application/json",
            "method":'GET'
        };
        const response = await axios.get('http://localhost:5008/api/User', headers);
        this.users = response.data;
      } catch (error) {
        console.error("Kullanıcıları alırken bir hata oluştu:", error);
      }
    },
    async UpdateUser(user){
      let url = `http://localhost:5008/api/User/` + user.userId
      delete user.userId
      try {
          await axios.put(url, user, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Kulanici basari ile guncellendi.")
      } catch (error) {
          alert("kullanici guncellenemedi")  
      }
    },
    async DeleteUser(userId){
      let url = `http://localhost:5008/api/User/User/` + userId
      try {
          await axios.delete(url, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Kullanıcı basari ile silindi.")
      } catch (error) {
          alert("Kullanıcı silinemedi.")  
      }
    },
    async UpdateCategory(category){
      let url = `http://localhost:5008/api/Category/` + category.categoryId
      delete category.categoryId
      try {
          await axios.put(url, category, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Kategori basari ile guncellendi.")
      } catch (error) {
          alert("Kategori guncellenemedi")  
      }
    },
    async DeleteCategory(categoryId){
      let url = `http://localhost:5008/api/Category/Category` + categoryId
      try {
          await axios.delete(url, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Kategori basari ile silindi.")
      } catch (error) {
          alert("Kategori silinemedi.")  
      }
    },
    async UpdateProduct(product){
      let url = `http://localhost:5008/api/Product/` + product.productId
      delete product.productId
      try {
          await axios.put(url, product, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Ürün basari ile guncellendi.")
      } catch (error) {
          alert("Ürün guncellenemedi")  
      }
    },
    async DeleteProduct(productId){
      let url = `http://localhost:5008/api/Product/Product/` + productId
      try {
          await axios.delete(url, {
          headers: {
          "Content-Type": "application/json"
          }
      })
          alert("Kullanıcı basari ile silindi.")
      } catch (error) {
          alert("Kullanıcı silinemedi.")  
      }
    },
    openCategorySection(){
      this.isCategorySectionOpen = true
      this.isProductSectionOpen = false
      this.isUserSectionOpen = false
    },
    openProductSection(){
      this.isCategorySectionOpen = false
      this.isProductSectionOpen = true
      this.isUserSectionOpen = false
    },
    openUserSection(){
      this.isCategorySectionOpen = false
      this.isProductSectionOpen = false
      this.isUserSectionOpen = true
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchProducts()
    this.fetchUsers()
  },
}
</script>

<style scoped>
.homePageGeneral {
  margin: auto;
  padding: 50px;
  height: 100vh;
  width: 100%;
  background: url('../../assets/restoran_arkaplan.jpeg') no-repeat center center;
  background-size: cover;
  display: flexbox;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.contentPage {
  width: 80%;
  max-height: fit-content;
  margin: 0 auto 0 auto;
  padding: 40px;
  background: rgba(154, 153, 153, 0.70); 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
  border-radius: 10px; 
  backdrop-filter: blur(10px); 
  justify-items: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-nav-button{
  padding: 10px 20px 10px 20px;
  margin: 0 30px 0 30px;
  border-radius: 10px;
  font-weight: bolder;
  border-color: transparent;
  background: rgba(225, 48, 48, 0.3);
}

.admin-nav-button:hover{
  background: rgba(225, 48, 48, 0.8);

}

.admin-navbar{
  display:flex;
  padding: 30px;
  justify-content: space-between;
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

.crud-section {
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

h2 {
  margin-bottom: 15px;
}

.delete-button{
  background: rgb(159, 0, 0);
  color: black;
  font-weight: bold;
  margin-left: 5px;
  border-radius: 10px;
  border-color: transparent;
  padding: 5px;
}

.update-button{
  background: rgb(92, 153, 1);
  color: black;
  font-weight: bold;
  border-radius: 7px;
  border-color: transparent;
  padding: 5px;

}

.delete-button:hover{
  background: rgb(255, 79, 79);
}

.update-button:hover{
  background: greenyellow;
}

table input{
  color: black;
  border-radius: 7px;
  padding: 10px;
}
</style>
