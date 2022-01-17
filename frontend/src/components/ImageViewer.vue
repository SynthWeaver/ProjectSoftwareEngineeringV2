<template>
  <div class="image-viewer-container">
    <div class="arrow-selector">
      <div class="big-img-hodler">
        <transition-group name="fade" tag="div">
          <img class="big-image" :src="headerImage" :key="headerImage" />
        </transition-group>
      </div>
    </div>
    <div class="image-navigation">
      <div class="next-image" @click="slideImage(-1)">
        <p>Vorige</p>
      </div>
      <div class="small-images-holder">
        <div>
          <div
            v-for="image in images"
            v-bind:key="image"
            @click="selectImage(image)"
          >
            <img v-bind:class="getImageClass(image)" :src="image" />
          </div>
        </div>
        <p class="afbeelding-index">
          Afbeelding {{ this.imgIndex + 1 }} van {{ images.length }}
        </p>
      </div>
      <div class="next-image" @click="slideImage(+1)">
        <p>Volgende</p>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins.js";
export default {
  name: "ImageViewer",
  props: ["images"],
  mixins: [mixins],
  components: {},
  data() {
    return {
      image: "",
      imgIndex: 0,
    };
  },
  methods: {
    selectImage(image) {
      this.imgIndex = this.images.indexOf(image);
    },
    /**
     *
     * @param int direction
     */
    slideImage(direction) {
      this.imgIndex = this.modulo(
        this.imgIndex + direction,
        this.images.length
      );
    },
    getImageClass(image) {
      let index = this.images.indexOf(image);
      if (index === this.imgIndex) {
        return "small-images-selected";
      }
      return "small-images";
    },
  },
  created() {
    console.log("This.images prop: ", this.images);
    this.image = this.images[this.imgIndex];
  },

  computed: {
    headerImage() {
      return this.images[this.imgIndex];
    },
  },
};
</script>

<style scoped>
.afbeelding-index {
  font-size: 25px;
}
.fade-leave-active {
  transition: 0s;
  height: 0px;
  width: 0px;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.product-image-small {
  height: 60px;
  width: 60px;
}
.big-img-hodler {
  max-width: 600px;
  margin-bottom: 1%;
}
.big-image {
  border-radius: 15px;
}
.small-images {
  height: 90px;
  width: 90px;
  opacity: 0.6;
}
.small-images:hover {
  height: 120px;
  width: 120px;
  opacity: 1;
}
.small-images-selected {
  height: 150px;
  width: 150px;
  opacity: 1;
}
/* Added by Yasmine */
.image-navigation {
  display: grid;
  grid-template-columns: 10% 80% 10%;
}
.next-image {
  background-color: black;
  color: white;
  height: 30%;
  width: 100%;
  padding-right: 100%;
  padding-left: 50%;
  text-align: center;
}
/* End of Added by yasmine */
.small-images-holder {
  display: grid;
}

.small-images-holder > div:first-child {
  grid-row-start: 2;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.small-images-holder > p:last-child {
  text-align: center;
}

.image-viewer-container {
  /* justify-items: center;
  justify-content: center; */
}

.arrow-selector {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  /* justify-content: center;
  justify-items: center; */
}

.arrow-selector > div:nth-child(2) {
  justify-self: center;
}

.arrow-selector > div:last-child {
  text-align: right;
}

img {
  width: 100%;
}
</style>