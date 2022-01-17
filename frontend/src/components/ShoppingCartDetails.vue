<template>
  <div class="grid">
    <div class="btn-black" @click="navigateToCatalogue()">
      <p>Terug naar de shop</p>
    </div>
    <h2 class="items-in-cart-message">
      {{ itemsInCart.length }} verschillende items in winkelwagen
    </h2>

    <ul class="items-in-cart">
      <li class="list-item" v-for="item in itemsInCart" :key="item.product.id">
        <ShoppingCartItemDetailed @remove="onRemove($event)" :item="item" />
      </li>
    </ul>
    <div class="paycheck">
      <p class="align-right">
        Subtotaal: {{ calculateSubtotal | twoDecimals }}
      </p>
      <p class="align-right">Verzendkosten: Gratis</p>
      <p v-if="!this.orderAllowed()" class="warningMessage">
        {{ showWarningMessage() }}
      </p>
    </div>
    <div class="order-btn">
      <div class="btn-black" @click="navigateToOrderPage()">
        <p>Bestellen</p>
      </div>
    </div>
  </div>
</template>
<script>
import ShoppingCartItemDetailed from "./ShoppingCartItemDetailed.vue";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import mixins from "../mixins/mixins";
export default {
  name: "ShoppingCartDetails",
  components: { ShoppingCartItem, ShoppingCartItemDetailed },
  mixins: [mixins],
  data() {
    return {
      MINIMUM_SPENDING_AMOUNT: 50,
    };
  },
  methods: {
    orderAllowed() {
      return this.calculateSubtotal > this.MINIMUM_SPENDING_AMOUNT;
    },
    onRemove(product) {
      this.$store.dispatch("removeThisProductFromCart", {
        item: product.item,
      });

      console.log("Hier vangen we de emit op");
    },
    navigateToOrderPage() {
      this.$router.push("/order");
    },
  },
  computed: {
    itemsInCart() {
      return this.$store.state.filteredCart;
    },
    calculateSubtotal() {
      let count = 0.0;
      this.$store.state.filteredCart.forEach(
        (item) => (count += item.amount * item.product.price)
      );
      return count;
    },
    remove() {
      return this.toggleRemove;
    },
  },
};
</script>

<style scoped>
.paycheck {
  background: black;
  color: whitesmoke;
  grid-row: 5;
  grid-column-start: 2;
  grid-column-end: 4;
  text-align: justify;
  padding-right: 25%;
  margin-right: 25px;
  justify-content: center;
}
.align-right {
  margin-left: 60%;
}

.grid {
  display: grid;
  grid-template-columns: 20%;
  grid-template-rows: 30%;
}
.items-in-cart-message {
  grid-row-start: 2;
  grid-column-start: 2;
}
.black-button {
  background: #000f0f;
  grid-row-start: 1;
  grid-column-start: 2;
  width: 150px;
}
.order-btn {
  grid-row-start: 5;
  grid-column-start: 6;
}
.items-in-cart {
  grid-row-start: 3;
  grid-column-start: 2;
  list-style: none;
}
.list-item {
  margin-bottom: 30px;
}
.warningMessage {
  background: crimson;
  display: flex;
  width: 100%;
  color: whitesmoke;
  justify-content: center;
  font-weight: bold;
  height: 30px;
  padding: 0;
  margin: 0;
  margin-left: 15%;
}

.black-button p {
  color: whitesmoke;
}
.black-button2 p {
  color: whitesmoke;
}
</style>
