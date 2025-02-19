<template>

    <div id="app">

        <router-view></router-view>

    </div>
    
</template>

<script>
// import '@/assets/appStyles.css';  // Kommentieren Sie diese Zeile temporär aus

export default {
    name: 'App',
    created() {
        const userData = localStorage.getItem('userData');
        if (!userData && this.$route.path !== '/') {
            this.$router.push('/');
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    width: 100%;
}

#app {
    height: 100vh;
    width: 100vw;
}
</style>