<template>
  <main class="main-grid">
    <ul>
      <li v-for="item in item.items" :key="item.id">
        <input
          :id="item.id"
          :value="item"
          type="checkbox"
          v-model="checkedItems"
        />
        <label>{{ item }}</label>
      </li>
    </ul>
  </main>
</template>

<script>
import CheckboxItem from "./CheckboxItem.vue";
export default {
  name: "Scrollview",
  props: ["item"],
  data() {
    return {
      checkedItems: [],
    };
  },
  watch: {
    checkedItems: function () {
      console.log("itemsChagned");
      this.$emit("refilter", this.items);
    },
  },
  methods: {
    print() {
      this.checkedItems.forEach((element) => {
        console.log(element);
      });
    },
  },
  components: { CheckboxItem },
  computed: {
    items() {
      return this.checkedItems;
    },
  },
};
</script>

<style scoped>
.main-grid {
  grid-template-rows: auto;
  grid-template-columns: 20% auto 20%;
  height: 250px;
  overflow-y: scroll;
  align-items: center;
}
section {
  padding: 5px;
}

ul {
  padding-left: 0;
  list-style: none;
}
</style>