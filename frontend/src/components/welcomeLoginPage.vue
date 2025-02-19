<template>
    <div class="welcome-page">
        <div class="content-wrapper">
            <h1 class="title">Welcome to Our App</h1>
            <p class="subtitle">Please log in to continue</p>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <input type="text" id="username" v-model="userName" required>
                    <label for="username">Username</label>
                    <div class="underline"></div>
                </div>

                <div class="form-group">
                    <input type="password" id="password" v-model="keyWord" required>
                    <label for="password">Password</label>
                    <div class="underline"></div>
                </div>

                <button type="submit" class="login-button">
                    <span>Log In</span>
                    <div class="ripple"></div>
                </button>
            </form>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <div class="additional-options">
                <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
                <a href="#" @click.prevent="signUp">Sign Up</a>
            </div>
        </div>

        <div class="background-animation"></div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'; // Importiere axios für HTTP-Anfragen

export default {
    name: 'WelcomeLoginPage',
    setup() {
        const userName = ref(''); // Benutzername
        const keyWord = ref(''); // Passwort
        const errorMessage = ref('');

        const handleLogin = async () => {
            try {
                const response = await axios.post('/api/login', {
                    userName: userName.value,
                    keyWord: keyWord.value
                });
                // Speichere die Benutzerdaten im localStorage
                localStorage.setItem('userData', JSON.stringify(response.data));
                // Weiterleitung basierend auf roleId
                switch (response.data.roleId) {
                    case 1:
                        window.location.href = '/admin';
                        break;
                    case 2:
                        window.location.href = '/manager';
                        break;
                    case 3:
                        window.location.href = '/residents';
                        break;
                    default:
                        errorMessage.value = 'Unbekannte Rolle!';
                }
            } catch (error) {
                errorMessage.value = error.response.data.error || 'Login fehlgeschlagen!';
            }
        };

        const forgotPassword = () => {
            alert('Forgot password functionality to be implemented');
        };

        const signUp = () => {
            alert('Sign up functionality to be implemented');
        };

        return {
            userName,
            keyWord,
            errorMessage,
            handleLogin,
            forgotPassword,
            signUp
        };
    }
}
</script>

<style>
@import '@/assets/welcomeLoginPage.css';
</style>