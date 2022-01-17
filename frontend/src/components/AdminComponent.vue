<template>
  <tr>
    <td>{{ this.id }}</td>
    <td>{{ this.email }}</td>
    <td>{{ this.createdAt }}</td>
  </tr>
</template>

<script>
export default {
  name: "AdminComponent",
  props: ["id", "email", "createdAt"],
  data() {
    return {
      totalPrice: 0,
    };
  },
  created() {
    this.checkDate(this.createdAt);
  },
  methods: {
    checkDate(date) {
      //check if date is null
      if (!date) {
        this.createdAt = "Niet bekend";
      } else {
        //format date
        const date = new Date(this.createdAt);

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

        this.createdAt =
          day +
          "-" +
          month +
          "-" +
          date.getFullYear();
      }
    },
  },
};
</script>


<style scoped>
  tr>td{
    border: 1px solid black;
  }
</style>