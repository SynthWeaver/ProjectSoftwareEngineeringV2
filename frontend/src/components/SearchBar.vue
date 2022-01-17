<template>
    <section>
        <input type="text" v-model="searchWord" v-on:keyup.enter="onEnter" placeholder="Zoek een product" >
        <font-awesome-icon :icon="searchIcon" class="icon" @click="search()" />
    </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Validate from '../js/Validate.js';
export default {
    name: "SearchBar",
    data() {
        return {
            searchWord: "",
            searchIcon: faSearch,
        };
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        search: function(){
            //validate searchword
            if(!Validate.string(this.searchWord)){
                alert("Onjuiste zoekopdracht. Probeer opnieuw.");
                return;
            } 

            //save searchword in localstorage
            localStorage.setItem('searchWord', this.searchWord);

            //go to catalogue page
            this.$router.replace('/catalogue').catch(err => {
                //ugly fix for revisit catologue error due to time limits
                window.location.reload();
            });
        },

        onEnter: function() {
            this.search();
        },
    },
};

</script>

<style scoped>

    section{
        text-align: center;
        margin-bottom: -5px;
        position: relative;
    }

    section > input{
        width: 100%;
        height: 100%;
        border-radius: 120px;
        text-align: center;
        font-size: 2rem;
        border-color: gray;
        border-style: solid;
        color: gray;
    }

    section > .icon{
        position: absolute;
        top: 20px;
        right: 1.4rem;
        font-size: 1.3rem;
    }

    section > input:focus {
        outline: none;
    }

</style>
