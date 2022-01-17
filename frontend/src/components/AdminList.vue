<template>
  <section id="admin-list-component">
    <h2>Lijst met administratoren</h2>
    <!-- Admins -->
    <article>
      <table ref="container" v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Aangemaakt</th>
        </tr>
        <!-- Data is displayed here -->
      </table>
    </article>
  </section>
</template>

<script>
import Vue from 'vue';
import AdminComponent from './AdminComponent.vue';
export default {
  name: "adminList",
  props: [
    "name", 
    "apiUrl", 
  ],
  data() {
    return {
      busy: false,
      count: 0,
      adminList: null,
    };
  },
  created() {  
    fetch("/api/admin/adminlist", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) =>{
        this.adminList = json.adminList;

        //check if adminList exists
        if(!this.adminList){
          const container = this.$el.querySelector("section>article");
          container.insertAdjacentHTML("beforeend", "Helaas, er zijn bestellingen.");
        }else{
          //show the first few admins
          this.loadMoreItems();
        }        
      });
  },
  methods: {
    //triggerd on scroll and after fetch from backend
    loadMoreItems() {
      if(this.adminList){
        const admin = this.adminList[this.count++];
        if(admin){
          this.render(admin)
        }
      }
    },

    render(admin){
      this.busy = true;
      setTimeout(() => {
        //get AdminComponent and make it an object
        const ComponentClass = Vue.extend(AdminComponent);
        const instance = new ComponentClass({
            propsData: { 
              id: admin.id,
              email: admin.email,
              createdAt: admin.createdAt,
            }
        });
        
        instance.$mount() // pass nothing

        //add AdminComponent (object) to container and add a h-line below it
        const container = this.$el.querySelector("section>article>table");
        container.appendChild(instance.$el);

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
