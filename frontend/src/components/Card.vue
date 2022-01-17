<template>
  <div class="main">
    {{ title }}
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title"],
};
</script>

<style scoped>
.main {
  background: #ffffff;
  border-style: solid;
  border-color: rgba(56, 56, 56, 0.6);
  border-radius: 3px;
  height: inherit;
  width: inherit;
  display: flex;
  border-width: 1px;
}
.main:hover {
  border-color: rgba(56, 56, 56, 0.9);
  border-width: 2px;
  height: inherit;
  width: inherit;
}
</style>