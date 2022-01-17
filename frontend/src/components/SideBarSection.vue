<template>
  <main>
    <h3 class="title">{{ title }}</h3>
    <slot />
  </main>
</template>

<script>
export default {
  name: "SideBarSection",
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.title {
  min-height: 40px;
  text-align: center;
}
</style>