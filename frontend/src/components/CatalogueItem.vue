<template>
  <div class="grid">
    <div class="image-hodler">
      <img
        @click="navigateToProduct(product.id)"
        class="img-icon"
        :src="this.product.imageUrls[0]"
      />
    </div>
    <h2 @click="navigateToProduct(product.id)" class="title">
      {{ product.name }}
    </h2>
    <h2 class="price">€ {{ product.price }}</h2>
    <div class="add-cart-button" @click="addToCart(product)">
      <div class="add-to-cart-btn"></div>
    </div>
    <div class="select-amount">
      <p class="aantal">Aantal:</p>
      <select class="amount-dropdown" v-model="amount">
        <option v-for="i in populateDropdown()" v-bind:key="i">
          {{ i }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
export default {
  name: "CatalogueItem",
  props: ["product", "store", "router"],
  mixins: [mixins],
  data() {
    return {
      amount: 1,
    };
  },
  methods: {
    addToCart(product) {
      console.log("product: ", product.imageUrls[0]);
      for (let i = 0; i < this.amount; i++) {
        this.$store.dispatch("addToCart", product);
      }
    },
    navigateToProduct(productId) {
      this.$router.push("/product/" + productId);
    },
  },
};
</script>


<style scoped>
p {
  padding: 0;
  margin-top: 0;
}
#amount {
  height: 30px;
}
.grid {
  display: grid;

  grid-template-columns: 30% 20% 20% 10%;
  grid-template-rows: 30%;
}
.grid1 {
  display: grid;
  grid-template-columns: 30% 20% 20% 10%;
  grid-template-rows: 30%;
  background: gray;
}
.title {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 5;
  vertical-align: top;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
  font-weight: bold;
  color: #707070;
}
.price {
  grid-row: 3;
  grid-column-start: 3;
  background-color: black;
  color: whitesmoke;
  border-radius: 14px;
  text-align: center;
  padding: 3px;
  margin-right: 12%;
}
.image-hodler {
  max-width: 500px;
  max-height: 500px;
}

.add-cart-button {
  grid-row: 3;
  grid-column: 4;
}
.cart-icon {
  display: block;
  margin: 25% 25% 25% 25%;
  height: 30px;
  width: 30px;
}
.img-icon {
  grid-column-start: 1;
  grid-column-end: 2;
  justify-content: center;
  justify-items: center;
  width: 100%;
  cursor: pointer;
}

.select-amount {
  grid-row: 3;
  padding-top: 18px;
  grid-column-start: 5;
  display: inline-flex;
  margin-left: 20px;
}
</style>