<template>
  <section>
    <article ref="container" v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <!-- Data is displayed here -->
    </article>
  </section>
</template>

<script>
  import Vue from 'vue';
  import CatalogueItem from './CatalogueItem.vue';
  import Validate from '../js/Validate.js';
  import productData from "../data/ProductData";
  export default {
    name: 'Scroll',
    props: ["apiUrl", "provinceFilters", "productsData"],
    computed: {
      filteredProducts() {
        return this.foundProducts;
    },
    data() {
      return {
        busy: false,
        count: 0,
        products: [],
        foundProducts: [],
      };
    },
    created() {
      //Component has been created!
      //if someone has searched for a word set searchword
      const searchWord = localStorage.getItem("searchWord");

      //remove cookie
      localStorage.removeItem("searchWord");

      //allow empty searchwords
      if (searchWord) {
        //validate searchword
        if (!Validate.string(searchWord)) {
          alert("Onjuiste zoekopdracht. Probeer opnieuw.");
          return;
        }
      }

      //get products from database

      const data = {
        word: searchWord,
      };
      
      fetch(this.apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) =>{
          this.products = json.products;

          //check if products exists
          if(!this.products){
            const container = this.$el.querySelector("section>article");
            container.insertAdjacentHTML("beforeend", "Helaas, er zijn producten.");
          }else{
            //show the first few products
            this.loadMoreItems();
          }    
        });
    },
    methods: {
      loadMoreItems() {
        if(this.products){
          const product = this.products[this.count++];
          if(product){
            this.render(product)
          }
        }
      }
    },

    render(product){
      this.busy = true;
      setTimeout(() => {
        //get catalogueItem component and make it an object
        const ComponentClass = Vue.extend(CatalogueItem);
        const instance = new ComponentClass({
            propsData: { 
              product: product,
              key: product.id,
              store: this.$store,
              router: this.$router,
            }
        });
        
        instance.$mount() // pass nothing

        //add catalogueItem (object) to product container and add a h-line below it
        const container = this.$el.querySelector("section>article");
        container.appendChild(instance.$el);
        container.insertAdjacentHTML("beforeend", "<hr />");

        this.busy = false;
      }, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
