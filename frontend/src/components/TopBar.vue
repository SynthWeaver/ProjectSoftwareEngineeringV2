<template>
  <div background-color="white">
    <div class="top_bar">
      <div class="fill"></div>

      <div>
        <div class="float_left">
          <img
            @click="navigateToHome()"
            :src="imageHome"
            height="100%;"
            alt=""
          />
        </div>

        <div class="float_left" @click="navigateToHome()">
          <h2>Souvenirbeurs</h2>
        </div>
      </div>
<!-- 
<div class="fill">
</div> -->
      <SearchBar/>

    <div class="fill">
      </div>
      <div class ="catalogueDiv">
       
       <div> <img src="https://i.postimg.cc/yYm1LVfS/Basecatologus.png"
        class ="catalogueIcon"  @click="navigateToCatalogue()">
</div>
      <div>
       <!-- <h2>Catalogus</h2> -->
       </div>
        </div>
      <!-- <div class="top_right"> -->
      <div>
        <div class="float_right">
          <h3 id="login-button" class="login-button" @click="openLoginPage()">Inloggen</h3>
          <h3 id="logout-button" class="hidden login-button" @click="logout()">Uitloggen</h3>
        </div>
        <div class="shopping-cart">
          <shopping-cart />
        </div>
      </div>

      <div class="fill"></div>
    </div>
  </div>
</template>

<script>
import ShoppingCart from "./ShoppingCart.vue";
import mixins from "../mixins/mixins.js";
import SearchBar from './SearchBar.vue';
export default {
  components: { 
    ShoppingCart,
    SearchBar,
  },
  data() {
    return {
      imageHome:
        "https://image.flaticon.com/icons/png/512/845/845022.png",
      imageCart:
        "https://www.clipartmax.com/png/middle/334-3348736_shopping-cart-svg-png-icon-free-download-shopping-cart-icon-svg.png",
    };
  },
  methods: {
    openLoginPage() {
      this.$router.replace('/login');
    },

    logout() {
      fetch("/api/logout", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          const logout = data.logout;
          if(logout){
            //on logout succesfull

            //set session and check it
            if(this.$session.logout()){
              //go to admin page
              this.$router.replace('/home');
            }            
          }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    },
  },
  mixins: [mixins],

  name: "Csstest",
};
</script>

<style scoped>
.top_bar {
  height: 50px;
  display: grid;
  grid-template-columns: 1% 21% 55% 3% 5% 8% 6%;
  /* grid-column-gap: 1em; */
  /* grid-gap: 5px; */
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
}

.catalogueDiv{
 text-align: center;
  /* margin-left: 1em; */
  width: 100%;
  display: flex;
  /* flex-direction: column;*/
  align-items: center;
  /* justify-content: center;*/
  font-family: cursive;
  cursor: pointer;
}
.catalogueIcon{
  width:100%;
}
.float_left {
  text-align: center;
  margin-left: 1em;
  float: left;
  height: 100%;
  display: flex;
  /* flex-direction: column;*/
  align-items: center;
  /* justify-content: center;*/
  font-family: cursive;
  cursor: pointer;
}

.float_right {
  text-align: center;
  margin-left: 1em;
  float: right;
  height: 100%;
  display: flex;
  /* flex-direction: column;*/
  align-items: center;
  /* justify-content: center;*/
  font-family: cursive;
}
.shopping-cart {
  z-index: 999;
  display: inline-block;
  position: fixed;
  top: 10px;
  right: 3%;
}

.top_bar > div {
  align-content: left;
  /* background: grey; */
  height: 50px;
}

.login-button{
  cursor: pointer;
}

.hidden{
  display:none;
}
</style>