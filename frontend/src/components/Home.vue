<template>
<div class="masterdiv">

  <div class="home-div">
  <h1> Home </h1>
  <h2> Door op een provincie of regio te klikken navigeert u naar de producten van de provincie/regio </h2>
  </div>
  <div class="provincediv">
    <!--When the Province componet emits ToggleOpen, ToggleOpen is called in home.vue-->
    <Province
      v-for="(data, i) in provincedata"
      :data="data"
      :index="i"
      :key="i"
      :open="data.open"
      @toggleOpen="toggleOpen"
    />
  </div>
</div>
</template>

<script>
import Province from "./Province.vue";
import { getData } from "../js/home.js";
import mixins from "../mixins/mixins";
export default {
  mixins: [mixins],
  async mounted() {
    this.provincedata = await getData();
  },
  name: "app",
  components: {
    Province,
  },
  data() {
    return { provincedata: "" };
  },
  methods: {
    async loggers(){
  
      console.log(provincedata)
      },
    async getData(){
      const data = await getData()
      return data
      },
      // Looks at all provinces and their indexes.
      // The province that triggered ToggleOpen will pass its index to this method
      // After that it will loop through all provines, if the Index matches the province.
      // It will set the data of the province to open causing the CSS classes to open it.
      // If it is not the matching index it close. 
    toggleOpen(index) {
      this.provincedata = this.provincedata.map((data, i) => {
        if (index === i) {
          data.open = !data.open;
        } else {
          data.open = false;
        }
        return data;
      });
    },
  },
};
</script>

<style scoped>
.home-div {
text-align: center;
}
.provincediv {
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(3, auto);
}
</style>