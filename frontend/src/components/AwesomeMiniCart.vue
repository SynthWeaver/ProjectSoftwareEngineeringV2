<template>
  <section class="main">
    <article class="mini-header">
      <h2>Winkelwagen</h2>
      <p>Uw gekozen items:</p>
    </article>
    <article class="scrollview">
      <li v-for="item in this.products" v-bind:key="item.id" class="list">
        <Card>
          <shopping-cart-item
            :item="item"
            :key="item.id"
            :removalEnabled="false"
          />
        </Card>
      </li>
    </article>
    <article>
      <slot />
    </article>
  </section>
</template>

<script>
import ShoppingCartItem from "./ShoppingCartItem.vue";
import Card from "./Card.vue";
export default {
  name: "AwesomeMiniCart",
  props: ["products"],
  components: { ShoppingCartItem, Card },
  methods: {},
};
</script>

<style scoped>
.mini-header {
  background: black;
  color: white;
  height: 90px;
  margin: 0;
  padding: 0;
}
.mini-header p {
  margin: 0;
  padding: 0;
}
.main {
  background: white;
}
.shopping-cart-items {
  width: 420px;
  max-height: 600px;
  border-color: grey;
  border-width: 1px;
  border-style: solid;
}
.list {
  list-style: none;
  width: 420px;
  height: 110px;
}
.scrollview {
  max-height: 440px;
  width: 430px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
.no-margin {
  margin: 0;
  padding: 0;
}
h2 {
  font-size: 30px;
}
article {
  text-align: end;
}
article p {
  margin-right: 5%;
  margin-top: 0;
  font-style: italic;
}
</style>