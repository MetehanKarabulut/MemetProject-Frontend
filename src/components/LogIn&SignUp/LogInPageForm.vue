<template>
    <div>
        <label class="formlabel">E-Mail :</label>
        <input type="email" v-model="email">

        <label class="formlabel">Şifre :</label>
        <input type="password" v-model="password">

        <button type="button" @click.prevent="login">Giriş Yap</button>
    </div>

    <button @click="this.$router.push('/signup')" class="signupbutton">Hesabınız yoksa kayıt olabilirsiniz</button>
</template>

<script>
import {handleLogIn} from '../../composables/FormFunctions';

export default {
    name: 'LoginPageForm',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            handleLogIn(
                this.email,
                this.password,
                () => {
                    alert('Hoş Geldiniz!');
                    this.$router.push('/home');
                },
                () => {
                    alert('Giriş başarısız');
                    this.resetLoginFields();
                },
                (error) => {
                    alert('Giriş sırasında bir hata oluştu.');
                    this.resetLoginFields();
                }
            );
        },
        resetLoginFields() {
            this.email = '';
            this.password = '';
        }
    },
};
</script>

<style scoped>
label{
    font-weight: bolder;
}
.signupbutton{
    background: transparent;
    color: black;
}

.signupbutton:hover{
    background: transparent;
    color: rgb(62, 62, 243);
    width: fit-content;
    height: fit-content;
}
</style>
