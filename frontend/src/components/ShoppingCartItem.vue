<template>
  <div class="grid">
    <img
      class="product-image"
      :src="this.item.product.imageUrls[0]"
      @click="navigateTo(this.item.product.id)"
    />

    <div class="product-title" @click="navigateTo(item.product.id)">
      <h3 class="title">
        {{ item.product.name }}
      </h3>
    </div>
    <div class="delete" v-if="this.removalEnabled">
      <span id="white" @click="removeItemFromCart(item)"> Verwijder item </span>
    </div>
    <div class="inline">
      <div class="amount-grid">
        <div class="price">
          <p><strong> Prijs: </strong> € {{ item.product.price }}</p>
        </div>
        <div class="amount">
          Aantal:
          <select
            v-model="goodAmount"
            @change="handleAmountChanged(item, goodAmount)"
            :key="item.id"
          >
            <option v-for="i in populateDropdown()" :key="i">
              {{ i }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import mixins from "../mixins/mixins";

export default {
  name: "ShoppingCartItem",
  props: ["item", "removalEnabled"],
  mixins: [mixins],
  data() {
    return {
      amount: 1,
      image: "",
      imagesData: "",
    };
  },
  methods: {
    handleAmountChanged(item, amount) {
      console.log("I am changing the amount...");
      this.$store.dispatch("changeAmount", {
        item: item,
        selectedAmount: amount,
      });
    },
    setImage() {
      //get the first index of the product images array
      this.image = this.getImagesByProductId(this.item.id)[0];
    },
    navigateTo(productId) {
      this.$router.push("/product/" + productId);
      //Basically refreshing page after route has changed
      this.$router.go(this.$router.currentRoute); //Could be handled better, but not working... guide: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
    },

    removeItemFromCart(item) {
      this.$emit("remove", { item: item, amount: this.removeAmount });
    },
  },
  computed: {
    getAmount() {
      return this.removeAmount;
    },
    goodAmount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.item.amount = value;
      },
    },

    itemsInCart() {
      return this.$store.state.filteredItems;
    },
    itemAmount() {
      return this.item.amount;
    },
  },
  async created() {
    console.log("imagesdata: ", this.item.id);
    let data2 = await fetch("/api/findimages/" + this.item.id);
    let json2 = await data2.json();
    console.log("cooljo ", json2);
    console.log(
      "Le images 2.0: ",
      json2.find((image) => image.productId === parseInt(productId))
    );
    return json2.find((image) => image.productId === parseInt(productId));

    this.amount = this.item.amount;
    this.setImage();
  },
};
</script>

<style scoped>
.inline {
  display: flex;
  white-space: nowrap;
}
.grid {
  display: grid;
  grid-template-columns: 30% 50% 20%;
  grid-template-rows: auto auto, auto;
  height: 110px;
}
.product-image {
  max-width: 100px;
  width: 100%;
  grid-row: 1;

  cursor: pointer;
}
.delete {
  background: crimson;

  grid-column: 2;
  grid-column-end: 2;
}
.product-title {
  display: grid;
  grid-row: 1;
  grid-column: 2;
  overflow: hidden;
  max-width: 150px;
  cursor: pointer;
  font-weight: bolder;
}
.amount-grid {
  display: grid;
}
.amount {
  grid-column: 2;
  grid-row: 3;
  font-weight: 500;
  font-size: 0.8em;
}
.price {
  grid-row: 1;
  margin: 0;
  grid-column: 2;
}
.price p {
  margin: 0;
  font-weight: bold;
  font-size: 18px;
}
.title {
  text-overflow: ellipsis;
  display: -webkit-box;
  font-weight: bold;
  font-size: medium;
  margin: 3px;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}

#white {
  color: whitesmoke;
}
</style>