<template>
  <main>
    <input type="checkbox" :value="value" v-bind:id="item" v-model="checked" />
    <label v-bind:for="item">{{ item }}</label>
  </main>
</template>

<script>
export default {
  name: "CheckboxItem",
  props: ["item", "value"],
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    isChecked() {
      return this.checked;
    },
  },
  methods: {
    check() {
      this.checked = !this.checked;
      this.$emit("updatedProvinceCheckboxes", this.item);
    },
  },
};
</script>

<style>
</style>