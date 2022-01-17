<template>
  <main class="grid-layout">
    <ul style="list-style: none">
      <li v-for="item in sideFilterItems.data" :key="item.id">
        <side-bar-section class="sidebar" :title="item.title">
          <section class="side-filter">
            <scrollview
              :item="item"
              @updatedRegionCheckboxes="refilterRegions($event)"
              @refilter="matchProductWithProvinces($event)"
            />
          </section>
        </side-bar-section>
      </li>

      <side-bar-section title="Prijs" class="slider">
        <price-range-slider :trackHeight="0.8" />
      </side-bar-section>
    </ul>

    <section class="main-items-grid">
      <ul style="list-style: none">
        <li v-for="product in productItems" :key="product.id">
          <catalogue-item :product="product" />
        </li>
        <article class="main-items">
          <Scrolling
            :provinceFilters="provinceFilterQueries"
            :apiUrl="'/api/catalog-items'"
            :productsData="productItems"
          />
        </article>
      </ul>
    </section>
    <div>
      <div class="right-side">
        <h1> Catalogus </h1>
        <h3> In de catalogus is het mogelijk om producten op Provincie en Regio te filteren. </h3>
      </div>
    </div>
  </main>
</template>

<script>
import Scrollview from "./Scrollview.vue";
import sideFilterItems from "../data/SideFilterItems";
import PriceRangeSlider from "./PriceRangeSlider.vue";
import SideBarSection from "./SideBarSection.vue";
import Scrolling from "./Scrolling.vue";
import CatalogueItem from "./CatalogueItem.vue";
export default {
  async mounted() {
    console.log("router is" + this.$router);
    this.getCatalogue();
  },
  name: "Catalogue",
  components: {
    CatalogueItem,
    Scrollview,
    PriceRangeSlider,
    SideBarSection,
    Scrolling,
    CatalogueItem,
  },
  async created() {

    let response = await fetch("/api/allProducts");

    let data = await response.json();

    console.log("json response: ", data.products);
    this.allProducts = data.products;


    if (this.$route.params.province) {
      this.selectedProvinceFilters.push(this.$route.params.province);
      console.log("Param: " + this.$route.params.province);
      let queries = [];
      queries.push(this.$route.params.province);
      this.matchProductWithProvinces(queries);
    }
  },
  computed: {
    foundProductsData() {
      return this.foundProducts.length > 0
        ? this.foundProducts
        : this.allProducts;
    },
    provinceFilterQueries() {
      return this.selectedProvinceFilters;
    },
    productItems() {
      return this.allProducts;
    },
  },
  methods: {
    refilterRegions(item) {},
    matchProductWithProvinces(provinces) {
      console.log("Provinces: ", provinces);
      this.selectedProvinceFilters = provinces;
      this.filterCatalogue();
    },

    offlineCatalogue() {},
    async getCatalogue() {
      console.log("getcatalogue called");
      let resp = await fetch("/api/allproducts", {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((json) => (this.backendData = json.products));
      // return resp;
    },
    filterCatalogue() {
      console.log("FILTER CCATALOGUE");
      let matches = [];

      let queries = this.provinceFilterQueries;
      console.log("quereis: ", queries);
      for (let i = 0; i < queries.length; i++) {
        console.log("province a: " + queries[i]);
        let products = this.allProducts.find(
          (product) => product.province === queries[i]
        );
        if (products) {
          matches.push(products);
        }
        this.foundProducts = matches;
        if (matches.length < 1) {
          console.log("No found products");
          this.foundProducts = [];
        }
      }

      console.log("matches: ", matches);
    },
    async getRegions() {
      //   await fetch("/api/regions", { method: "GET" })
      //     .then((resp) => resp.json())
      //     .then((json) => console.log("regions", json));
      // },
      //   console.log("Get youssef");
      fetch("/api/allProducts")
        .then((response) => console.log(response.json()))
        .then(function response(data) {
          return data;
        });
    },
  },
  data() {
    return {
      backendData: [],
      selectedProvinceFilters: [],
      sideFilterItems,
      allProducts: [],
      foundProducts: [],
    };
  },
};
</script>

<style scoped>
.slider {
  grid-column: 1;
  padding-left: 5%;
  padding-right: 5%;
  height: 120px;
  border-style: solid;
  border-width: 1px;
}
.sidebar {
  border-style: solid;
  border-width: 1px;
}
.main-items-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}
.grid-layout {
  display: grid;
  grid-template-columns: 20% auto 15%;
}
.side-filter {
  grid-column: 1;
}
.main-items {
  grid-column: 2;
}
.right-side {
  background-color: black;
  color: white;
  padding: 3%;
  grid-column: 3;
}
.side-image {
  position: sticky;
  margin-left: 33%;
  width: 70%;
  height: 70%;
}
</style>