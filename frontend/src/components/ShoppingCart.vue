<template>
  <div>
    <div @click="toggleCart()" class="float-right">
      <span id="item-counter">{{ amountOfItems }}</span>
      <img src="../assets/add_shopping_cart-24px.svg" />
    </div>
    <div class="awesomeminicart">
      <ul style="list-style: none" v-show="this.showCart">
        <AwesomeMiniCart :products="filteredCart">
          <div class="paycheck">
            <p>Subtotaal: € {{ calculateSubtotal | twoDecimals }}</p>
            <p>Verzendkosten: Gratis</p>
            <p v-if="!this.orderAllowed()">{{ this.showWarningMessage() }}</p>
            <div @click="navigateToShoppingCart()" class="to-cart">
              <span> Naar winkelwagen &amp; afrekenen </span>
            </div>
          </div>
        </AwesomeMiniCart>
      </ul>
    </div>
  </div>
</template>

<script>
import AwesomeMiniCart from "./AwesomeMiniCart.vue";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import Card from "./Card.vue";
export default {
  components: { ShoppingCartItem, Card, AwesomeMiniCart },
  name: "ShoppingCart",

  methods: {
    orderAllowed() {
      return this.calculateSubtotal > this.MINIMUM_ORDER_PRICE;
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    countItems() {},

    showWarningMessage() {
      return "Het minimale aankoopbedrag is 50 euro.";
    },
    navigateTo(id) {
      this.$router.push("/product/" + id);
      //Basically refreshing page after route has changed
      this.$router.go(this.$router.currentRoute); //Could be handled better, but not working... guide: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
    },
    navigateToShoppingCart() {
      this.$router.push("/scdetails");
      this.toggleCart();
      //Basically refreshing page after route has changed
    },
    printItem(obj) {
      console.log(obj);
    },
  },
  data() {
    return {
      items: [],
      subtotal: 0.0,
      showCart: false,
      MINIMUM_ORDER_PRICE: 50.0,
    };
  },
  watch: {},
  computed: {
    itemsInCart() {
      return this.$store.state.itemsInCart;
    },
    filteredCart() {
      return this.$store.state.filteredCart;
    },

    amountOfItems() {
      let amount = 0;
      this.$store.state.filteredCart.forEach(
        (item) => (amount += parseInt(item.amount))
      );

      return amount;
    },
    calculateSubtotal() {
      console.log(this.$store.state.filteredCart)
      let count = 0.0;
      this.$store.state.filteredCart.forEach(
        (item) => (count += item.amount * item.product.price)
      );
      return count;
    },
  },
  filters: {
    twoDecimals(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style scoped>
.awesomeminicart {
  float: right;
  margin-top: 45px;
}
.float-right {
  float: right;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.paycheck {
  background-color: black;

  color: whitesmoke;
  margin-top: 0;
  padding-top: 0;
}
.paycheck p {
  color: whitesmoke;
}
.cart-items-dropdown {
  display: flex;
  pointer-events: none !important;
}
.shopping-cart-background {
  background-color: lightcyan;
  pointer-events: none !important;
  width: inherit;
  height: inherit;
}
.product-image {
  width: 40px;
  height: 40px;
  pointer-events: none;
}

#item-counter {
  color: floralwhite;
  background: red;
  border-radius: 50%;
  padding: 5%;
  border-color: floralwhite;
  border-width: 4em;
  z-index: 10;
}
.to-cart {
  background: white;
  height: 60px;
  width: 90%;
  margin-left: 5%;
  cursor: pointer;

  justify-content: center;
  justify-items: center;
  border-width: 1px;
  border-radius: 2%;
  border-style: solid;
  border-color: black;
  text-align: center;
}
.to-cart span {
  color: black;
}
p {
  color: black;
}
</style>