<template>
  <div class="grid">
    <img class="image" :src="product.imageUrls[0]" />
    <p class="title">
      {{ product.name }}
    </p>
    <div class="small-items">
      <img
        src="@/assets/remove.png"
        class="trash"
        @click="removeItemFromCart(item)"
      />
      <div class="amount">
        Aantal:
        <select
          v-model="goodAmount"
          @change="handleAmountChanged(item, goodAmount)"
          :key="item.product.id"
        >
          <option v-for="i in populateDropdown()" :key="i">
            {{ i }}
          </option>
        </select>
      </div>
      <p class="price">€ {{ this.product.price }}</p>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
export default {
  name: "ShoppingCartItemDetailed",
  props: ["item"],
  mixins: [mixins],
  data() {
    return {
      product: this.item.product,
      amount: 1,
    };
  },

  methods: {
    removeItemFromCart(item) {
      this.$emit("remove", { item: item, amount: this.removeAmount });
    },

    handleAmountChanged(item, amount) {
      console.log("I am changing the amount...");
      this.$store.dispatch("changeAmount", {
        item: item,
        selectedAmount: amount,
      });
    },
  },
  computed: {
    goodAmount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.item.amount = value;
      },
    },
  },
  created() {
    this.amount = this.item.amount;
  },
};
</script>

<style>
.grid {
  grid-auto-columns: auto auto 10% 10% 10%;
  grid-auto-rows: auto auto auto;
}
.image {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
  max-height: 500px;
  max-width: 500px;
}
.title {
  grid-row: 1;
  grid-column-start: 3;
  grid-column-end: 5;
  text-align: start;
}
.small-items {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-template-columns: 33% 33% 33%;
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 5;
  padding-right: 120px;
  width: 420px;
}
.trash {
  width: 40px;
  height: 40px;
}
.amount {
}
.price {
}
</style>