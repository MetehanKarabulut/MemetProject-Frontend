<template>
    <div class="page">
        <form class="loginform">          
            <form>
                <LogInPageForm v-if="this.$route.path === '/login' || this.$route.path === '/logpage'"/>
                <SignUpPageForm v-else-if="this.$route.path === '/signup'"/> 
            </form>
        </form>
    </div>
</template>

<script>
import LogPageNavbar from '../components/LogIn&SignUp/LogPageNavbar.vue';
import LogInPageForm from '../components/LogIn&SignUp/LogInPageForm.vue';
import SignUpPageForm from '@/components/LogIn&SignUp/SignUpPageForm.vue';

export default {
    name : 'login',
    components: {
        LogPageNavbar, LogInPageForm,SignUpPageForm
    }
}
</script>

<style>
html, body{
    margin: 0;
    padding: 0;
}
.linkcontainer{
    display: flex;
    margin-bottom: 30px;
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.loginform {
    background-color: #fff; 
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loginform input[type="email"]{
    width: 100%;
    padding: 10px;
    margin: 15px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.loginform input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 15px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.loginform input[type="tel"] {
    width: 100%;
    padding: 10px;
    margin: 15px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.loginform input[type="text"] {
    width: 100%;
    padding: 10px;
    margin: 15px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.loginform button {
    width: 100%;
    padding: 10px;
    margin-top: 30px;
    border-radius: 10px;
    border: none;
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
}

.loginform button:hover {
    background-color: #0056b3;
}

.router-link1:hover,.router-link2:hover{
    background-color: #0056b3;
}
</style>