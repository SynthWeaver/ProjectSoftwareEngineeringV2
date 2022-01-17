<template>
  <div class="province-item">
    <!-- After clicking on a province item itself navigate to catalogue with
    The province selected as filter. -->
    <section
      class="provincedata"
      id="provincedata"
      @click="navigateToProvinceCatalogueSection()"
    >
      <article class="provincetext-div">
        <!-- Creates a div with the province name that has been received -->
        <div id="provincename-text">
          {{ data.name }}
        </div>
        <!-- Background image for the province item -->
        <img class="item-background" :src="data.imageUrl" />
      </article>
    </section>
    <!-- Region items -->
    <!-- When the show-regions button is clicked the ToggleOpen 
    method is emitted to the Home component -->
    <!-- This will open the province regions of the province that the button belongs to -->
    <section
      :class="open ? 'data open' : 'data'"
      @click="$emit('toggleOpen', index)"
    >
      <button class="show-regions">Toon alle</button>
      <!-- When clicking on a region item navigate to the  regionpage -->
      <button
        class="province-regions"
        v-for="item in data.regions"
        :key="item.regions"
        @click="navigateToRegion(item)"
      >
        {{ item }}
      </button>
    </section>
</div>
</template>

<script>
import mixins from "../mixins/mixins.js";

export default {
  mixins: [mixins],
  name: "province",
  props: ["data", "index", "open"],
  data() {
    return {
      provinceData: this.data,
    };
  },
  methods: {
    navigateToProvinceCatalogueSection() {
      console.log("p data ", this.provinceData);
      let province = this.provinceData.name;
      this.$router.push("/catalogue/" + province);
    },
  },
};
</script>

<style>

/* Contains one province object */
.province-item {
  grid-template-columns: 50% 50%;
}
.provincedata {
  text-align: center;
}

.provincedata h3 {
  padding-top: 2%;
  font-weight: bold;
  color: white;
  font-size: 35px;
}
.province-item {
  padding-right: 3%;
  padding-left: 3%;
  margin-bottom: 5%;
}

/*Styling for the Region buttons that belong to the province */
.show-regions {
  grid-row-start: row2-start;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: span 2;
  color: black;
  background-color: white;
  height: 100%;
}

.show-regions {
  font-size: 20px;
  margin-bottom: 1%;
}

.provincebackground {
  width: 100%;
  height: 100%;
}
#provincename-text {
  color: white;
  font-size: 35px;
  background-color: black;
}

.province-regions {
  color: white;
  font-size: 40px;
  background-size: cover;
  background-repeat: none;
  background-color: black;
}

.show-regions {
  width: 100%;
}
.display-regions {
  width: 100%;
}
.province-item .item-background {
  height: 150px;
  min-width: 100%;
}

.data .province {
  font-size: 20px;
  transition: all 0.4s linear;
}
.data .province-regions::after {
  transition: all 0.2s linear;
}

.province-regions {
  display: none;
}

.data .province-regions {
  font-size: 18px;
  opacity: 0;
}

.data.open,
.data {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}

.data > button.province-regions:nth-child(2),
.data > button.province-regions:nth-child(3) {
  display: block;
  opacity: 1;
}

/* By changing the opacity to 1 the previously invincible items become visible */
.data.open .province-regions {
  opacity: 1;
  display: block;
  transition: all 0.4s ease-out;
}
</style>

