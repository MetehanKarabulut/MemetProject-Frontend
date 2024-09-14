<template>
  <button @click="this.$router.push('/login')" class="loginbutton">Log In</button>
  <button @click="this.$router.push('/signup')" class="signupbutton">Sign Up</button>
</template>

<script>
export default {
}
</script>

<style scoped>
.loginbutton{
  padding: 10px;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid black;
  text-decoration: none;
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;   
}

.signupbutton{
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
  border: 1px solid black;
  text-decoration: none;
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;   
}
</style>