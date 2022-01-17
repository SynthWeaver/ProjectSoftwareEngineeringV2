<template>
  <section id="orderhistory-component">
    <h2>{{ name }}</h2>
    <!-- Orders -->
    <article>
      <table ref="container" v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <tr>
          <th>Email</th>
          <th>Totaal bedrag</th>
          <th>Datum</th>
        </tr>
        <!-- Data is displayed here -->
      </table>
    </article>
  </section>
</template>

<script>
import Vue from 'vue';
import OrderComponent from './OrderComponent.vue';
export default {
  name: "OrderHistory",
  props: [
    "name", 
    "apiUrl", 
  ],
  data() {
    return {
      busy: false,
      count: 0,
      orders: null,
    };
  },
  created() {  
    fetch(this.apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) =>{
        this.orders = json.orders;

        //check if orders exists
        if(!this.orders){
          const container = this.$el.querySelector("#orderhistory-component>article");
          container.insertAdjacentHTML("beforeend", "Helaas, er zijn bestellingen.");
        }else{
          //show the first few orders
          this.loadMoreItems();
        }        
      });
  },
  methods: {
    //triggerd on scroll and after fetch from backend
    loadMoreItems() {
      if(this.orders){
        const order = this.orders[this.count++];
        if(order){
          this.render(order)
        }
      }
    },

    render(order){
      this.busy = true;
      setTimeout(() => {
        //get OrderComponent component and make it an object
        const ComponentClass = Vue.extend(OrderComponent);
        const instance = new ComponentClass({
            propsData: { 
              email: order.userEmail,
              products: order.Products,
              date: order.placedAt,
            }
        });
        
        instance.$mount() // pass nothing

        //add OrderComponent (object) to product container and add a h-line below it
        const container = this.$el.querySelector("#orderhistory-component>article>table");
        container.appendChild(instance.$el);
        // container.insertAdjacentHTML("beforeend", "<hr />");

        this.busy = false;
      }, 1);
    }
  }
};

</script>

<style scoped>
  *{
      margin: 0;
  }

  section > h2{
    text-align: center;
  }

  table{
    border-collapse: collapse;
    width: 100%;
  }

  tr>th{
    border: 1px solid black;
  }
</style>
