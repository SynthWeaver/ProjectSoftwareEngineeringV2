import Vue from "vue";
import Vuex from "vuex";
import mixins from "../src/mixins/mixins";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  mixins: [mixins],
  state: {
    itemsInCart: [],
    filteredCart: [],
    smooth: [],
  },
  

  mutations: {
    ADDTOCART(state, payload) {
      state.itemsInCart.push(payload);
      console.log('added')
      
    },
    REMOVEFROMCART(state, payload) {
     console.log("Payload id: ", payload.item.product);
      let itemsRemoved =  0; 
      console.log('Amount' + payload.amount);
     
      for(let i = 0; i<=state.itemsInCart.length; i++){
        if(payload.item.product.id == state.itemsInCart[i].id){
          state.itemsInCart.splice(i, 1);
          itemsRemoved++; 
          if(itemsRemoved == payload.amount){
            break;
          }
        }
        
      }
    },
    REMOVETHISPRODUCTFROMCART(state, payload){
      let products = [];
      for(let i = 0; i< state.itemsInCart.length; i++){
        if(payload.item.product.id != state.itemsInCart[i].id){
           products.push(state.itemsInCart[i]);
        }
      }
      state.itemsInCart = products;
    
    
    },
      REMOVETHISPRODUCTFROMCARTBAD(state, payload){
        let value = payload.item.product.id; 
      
      console.log("before, " , state.itemsInCart); 
      let updatedCart = state.itemsInCart.filter(function(x) {
        return x !== value;
      });
      state.itemsInCart = updatedCart; 
      console.log(state.itemsInCart);
      this.dispatch('filterCart'); 
    
    
    },
    EMPTYCART(state) {
      state.itemsInCart = [];
    },
    

    CHANGEAMOUNT(state, payload){
      console.log('payload: ', payload)
      //selectedamount = 18
      for(let i = 0; i < state.itemsInCart.length; i++){
        console.log('1')
        if(state.filteredCart[i] != undefined && payload.item.product.id == state.filteredCart[i].product.id){
          console.log('2')
          let amount = state.filteredCart[i].amount; 

           if(amount > payload.selectedAmount){
              console.log('3')
            let removeAmount=  amount - payload.selectedAmount; 
            this.dispatch('removeFromCart',  {item: payload.item, amount: removeAmount}) 
          }else if(amount < payload.selectedAmount){
             console.log('4')
            let addAmount = payload.selectedAmount - amount;
            for(let i = 0; i< addAmount; i++){
               console.log('5')
                this.dispatch('addToCart', payload.item.product);

            }
                    }

        }
      }
      
      
      
     // state.filteredCart[state.filteredCart.indexOf(payload.product)].amount = payload.amount;
      console.log('changed amount....')
    },  
   
    /**
     * Apply filter operations on the shopping cart to eliminate duplicate entry rows and
     * update the right amount of items in the shopping
     * @param {*} state
     */
    FILTERCART(state) {
      let ids = [];
      for (let i = 0; i < state.itemsInCart.length; i++) {
        ids.push(state.itemsInCart[i].id);
      }

      const countUnique = (arr) => {
        const counts = {};
        for (var i = 0; i < arr.length; i++) {
          counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        return counts;
      };

      let uniqueIds = countUnique(ids);
      let smoothCart = [];
      for (let i = 0; i < Object.keys(uniqueIds).length; i++) {
        smoothCart.push({
          product: mixins.methods.getProductByID(Object.keys(uniqueIds)[i]),
          amount: Object.values(uniqueIds)[i],
        });

     
      }
      state.filteredCart = smoothCart;
    },
  },
  actions: {
    addToCart(context, value) {
      context.commit("ADDTOCART", value);
    },
    removeFromCart(context, value) {
      context.commit("REMOVEFROMCART", value);
    },
    emptyCart(context) {
      context.commit("EMPTYCART");
    },
    filterCart(context) {
      context.commit("FILTERCART");
    },
    changeAmount(context, value) {
      context.commit('CHANGEAMOUNT', value);
    },
    removeThisProductFromCart(context, value){
      context.commit('REMOVETHISPRODUCTFROMCART', value);
    }
  },
});
