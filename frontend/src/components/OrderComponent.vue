<template>
  <tr>
    <td>{{ this.email }}</td>
    <td>€{{ this.totalPrice.toFixed(2) }}</td>
    <td>{{ this.date }}</td>
  </tr>
</template>

<script>
export default {
  name: "OrderComponent",
  props: ["email", "products", "date"],
  data() {
    return {
      totalPrice: 0,
    };
  },
  created() {
    this.calculateTotalPrice(this.products);
    this.checkDate(this.date);
  },
  methods: {
    calculateTotalPrice(products) {
      products.forEach((product) => {
        const price = product.price;
        const quantity = product.OrderProduct.quantity;
        const total = this.multdec(price, quantity);
        this.totalPrice += total;
      });
    },
    checkDate(date) {
      //check if date is null
      if (!date) {
        this.date = "Niet bekend";
      } else {
        //format date
        const date = new Date(this.date);

        //add 0 before day
        let day = date.getDate();
        if(day <= 9){
          day = "0" + day;
        }

        //add 0 before month
        let month = date.getMonth() + 1;
        if(month <= 9){
          month = "0" + month;
        }

        this.date =
          day +
          "-" +
          month +
          "-" +
          date.getFullYear();
      }
    },

    //function for multiplying decimals without javascript bugs
    //source: https://coderwall.com/p/rca5gq/javascript-painless-decimal-multiplication
    multdec(val1, val2) {
      return (val1 * 10 + val2 * 10) / 10;
    },
  },
};
</script>


<style scoped>
  tr>td{
    border: 1px solid black;
  }
</style>