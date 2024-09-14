<template>
    <div class="container">
        <div @click="navigateToInfoSite(butcherTitle)" class="section left" @mouseover="showInfo('left')" @mouseleave="hideInfo">
          <img src="../assets/memet_logo.png" alt="Butcher Logo" class="logo" />
          <div class="info" :class="{ active: activeSection === 'left' }">
            <h2>{{butcherTitle}}</h2>
            {{butcherInfo }}
          </div>
        </div>
        <div @click="navigateToMarket(restaurantTitle)" class="section center" @mouseover="showInfo('center')" @mouseleave="hideInfo">
          <img src="../assets/memet_logo.png" alt="Restaurant Logo" class="logo" />
          <div class="info" :class="{ active: activeSection === 'center' }">
            <h2>{{restaurantTitle}}</h2>
            {{restaurantInfo}}
          </div>
        </div>
        <div @click="navigateToInfoSite(steakHouseTitle)" class="section right" @mouseover="showInfo('right')" @mouseleave="hideInfo">
          <img src="../assets/memet_logo.png" alt="Steakhouse Logo" class="logo" />
          <div class="info" :class="{ active: activeSection === 'right' }">
            <h2>{{ steakHouseTitle }}</h2>
            {{steakHouseInfo}}
          </div>
        </div>
      </div>
</template>

<script>
import info from '../data/FirstPage.json';
import LogPageView from './LogPageView.vue';

export default {
  data() {
    return {
      activeSection: null,
      butcherInfo: "",
      restaurantInfo: "",
      steakHouseInfo:"",
      butcherTitle: "",
      restaurantTitle: "",
      steakHouseTitle:"",
      info:{}
    };
  },
  methods: {
    showInfo(section) {
      this.activeSection = section;
    },
    hideInfo() {
      this.activeSection = null;
    },
    navigateToInfoSite(title){
      this.$router.push('/home')
      sessionStorage.setItem('user', null)
      sessionStorage.setItem('title', JSON.stringify(title))
    },
    navigateToMarket(title){
      sessionStorage.setItem('title', JSON.stringify(title))
      this.$router.push('/logpage')
    }
  },
  mounted(){
    this.info = info
    this.butcherInfo = info.info.butcherInfo
    this.restaurantInfo = info.info.restaurantInfo
    this.steakHouseInfo = info.info.steakHouseInfo
    this.butcherTitle = info.title.butcherTitle
    this.restaurantTitle = info.title.restaurantTitle
    this.steakHouseTitle = info.title.steakHouseTitle
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.section {
  flex: 1;
  color: rgb(255, 255, 255);
  font-weight: bolder;
  font-family: 'Lora', serif;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  overflow: hidden; 
}

.section.left {
  background-image: url('../assets/kasap_arkaplan.jpeg');
}

.section.center {
  background-image: url('../assets/restoran_arkaplan.jpeg');
}

.section.right {
  background-image: url('../assets/izgara_doga.jpg');
}

.section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5); 
  backdrop-filter: blur(50px); 
  opacity: 0.65;
  transition: opacity 0.3s ease; 
  z-index: 1; 
}

.section:hover::before {
  opacity: 0.9;
}

.logo {
  max-width: 50%;
  max-height: 50%;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.7));
  transition: transform 0.3s ease;
}

.section:hover .logo {
  transform: scale(1.3);
  z-index: 0;
}

.info {
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  text-align: center;
  max-width: 90%;
  max-height: 90%; 
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.info.active{
  opacity: 1;
}

.section.left .info {
  left: -100%;
}

.section.center .info {
  top: -100%;
}

.section.right .info{
  right: -100%;
}

.section.left .info.active {
  left: 5%;
  padding: 12px;
}

.section.center .info.active {
  top: 45%;
  padding: 12px;

}

.section.right .info.active {
  right: 5%;
  padding: 12px;
}
</style>
