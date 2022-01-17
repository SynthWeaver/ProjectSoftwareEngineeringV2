<template>
  <div>
    <div class="shopping-cart"></div>

    <div class="top-grid">
      <div class="btn-home" @click="navigateToCatalogue()">
        <p>Terug naar de shop</p>
      </div>

      <div class="title-tags">
        <h1>{{ this.product.name }}</h1>
        <ul class="tag-list">
          Tags
          <li><h3>Ring</h3></li>
          <li><h3>Zeeuwse Knop</h3></li>
          <li><h3>Zeeuwse Knop</h3></li>
        </ul>
      </div>
    </div>

    <div class="item-grid">
      <!-- Left pane -->
      <div class="item-display-grid">
        <image-viewer class="portrait" :images="images" />
      </div>

      <!-- Right Pane -->
      <div class="item-details-grid">
        <div class="price-grid">
          <div class="price">
            <p class="big">Prijs: {{ this.product.price }}</p>
            <h3 class="btw">Inclusief 21% BTW</h3>
          </div>
          <div class="add-to-cart">
            <div class="amount-select">
              <div><p class="amount-text">Aantal</p></div>
              <div>
                <select class="amount-dropdown" v-model="amount">
                  <option disabled value="">Selecteer aantal</option>
                  <option
                    v-for="index in populateDropdown()"
                    v-bind:key="index"
                  >
                    {{ index }}
                  </option>
                </select>
              </div>
            </div>
            <div class="inline">
              <p class="cart-text">Plaats in winkelwagen</p>
              <div class="add-cart-button">
                <div class="add-to-cart-btn" @click="addToCart(product)"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="description">
          <p id="desc">Beschrijving</p>
          <p>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productData from "../data/ProductData";

import ImageViewer from "./ImageViewer.vue";
import mixins from "../mixins/mixins";

export default {
  components: { ImageViewer },
  name: "Product",
  mixins: [mixins],
  data() {
    return {
      amount: 1,
      product: productData.products[0],
    };
  },
  methods: {
    addToCart(product) {
      for (let i = 0; i < this.amount; i++) {
        this.$store.dispatch("addToCart", product);
      }
    },

    emptyCart() {
      this.$store.dispatch("emptyCart");
    },

    getProductData() {
      fetch("/api/allProducts")
        .then((response) => response.json())
        .then((json) => {
          const products = json.products;
          this.id = this.$route.params.id;

          const product = products.find(
            (product) => product.id === parseInt(this.id)
          );

          fetch("/api/findimages/" + this.id)
            .then((response) => response.json())
            .then((json) => {
              console.log("Json: ", json);
              let imageUrls = [];
              for (let i = 0; i < json.length; i++) {
                imageUrls.push(json[i].imageUrl);
              }
              console.log("Imageurls: ", imageUrls);
              this.product.images = imageUrls;
            });

          //temp filler, todo: waiting database changes
          this.product.name = product.name;
          this.product.price = product.price;
          // this.product.images[0].imageUrl = product.imageUrl;
        });
    },
  },
  computed: {
    subtotal() {
      return parseInt(this.amount) * this.product.price;
    },
    images() {
      return this.product.images;
    },
  },
  filters: {
    twoDecimals(value) {
      return value.toFixed(2);
    },
  },
  async created() {
    //get data from backend
    this.getProductData();
  },
};
</script>

<style scoped>
/* Top grid */
.top-grid {
  display: grid;
  grid-template-columns: 20% 70%;
  grid-template-rows: auto auto;
}
.top-grid .btn-home {
  margin-top: 5%;
  margin-right: 15%;
  text-align: center;
  color: white;
  background: black;
  width: auto;
  height: 30%;
}
.top-grid .tag-list ul {
  height: 5%;
}
.top-grid .tag-list li {
  height: 20%;
  display: inline-block;
  margin-right: 0.5%;
  margin-left: 1%;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0px 1.5%;
}

/* Start of Middle grid */
.item-display-grid .image-viewer {
  max-width: 100%;
  max-height: 100%;
}

.item-display-grid .portrait {
  max-width: 60%;
  max-height: auto;
}
.container {
  display: grid;
  grid-template-columns: auto 25% auto auto;
  grid-template-rows: 20% auto auto auto;
}

.item-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}

.item-details-grid {
  float: left;
}
.price-grid {
  margin-top: 5%;
}
.amount-dropdown {
  height: 80%;
}

/* End of middle grid */

.big {
  font-size: 40px;
  margin: 0px;
}
.btw {
  margin: 0px;
}
.add-to-cart {
  margin-top: 5%;
}

.add-cart-button {
  background-color: gold;
  grid-row: 1;
  grid-column: 3;
  width: 60px;
  height: 30px;
}
.amount-select {
  display: grid;
  grid-template-columns: 10% 20%;
  grid-template-rows: auto;
}
.amount-text {
  font-weight: bold;
}
.cart-text {
  font-weight: bold;
}

/* End of right side styling */
.btn-home {
  justify-content: center;
  padding-left: 2%;
  color: white;
  background: black;
  width: 40%;
  height: 100%;
}
.inline {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 30% 0%;
  justify-content: flex-start;
}

/* .title-tags-grid {
  display: grid;
}
.title-tags {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 2;
  font-size: 20px;
} */
#desc {
  font-weight: bold;
  font-size: 20px;
}
.description {
  margin-top: 10%;
}
.description > p {
  margin: 0;
}

.description > p:first-child {
  margin: 1rem 0;
  margin-left: 0.5rem;
}

.description > p:last-child {
  border: 1px solid #949494;
  padding: 4px;
}
</style>