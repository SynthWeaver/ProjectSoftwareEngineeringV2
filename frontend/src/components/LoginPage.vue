<template>
    <section id="login-page">
        <article></article>
        <Login/>
        <article></article>
    </section>
</template>

<script>
    import Login from './Login.vue';
    export default {
        name:"LoginPage",
        components: {
            Login,
        },
        methods: {
            
        },
    }     
</script>

<style scoped>
    #login-page{
        display: grid;
        grid-template-columns: auto auto auto;
    }
</style>
