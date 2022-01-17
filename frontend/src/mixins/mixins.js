
const MAXIMAL_ITEMS = 50;
let productData = [];
let imagesData = [];
export default {
  async beforeMount(){
    let data = await fetch("/api/allProducts");
    let json = await data.json();
    console.log(json);
    productData = json;
    let data2 = await fetch("/api/findimages");
    let json2 = await data2.json();
    console.log(json2);
    imagesData = json2; 

  },
 data() {
    return {
     
    };
  },
  methods: {
    /**
   / Functions as java % (mod) operator
   / @param int value
   / @param int modulo
   */
    modulo(value, modulo) {
      return ((value % modulo) + modulo) % modulo;
    },

    
   async getImagesByProductId(productId){
      console.log("imagesdata: ", imagesData);
      let data2 = await fetch("/api/findimages/" + productId);
      let json2 = await data2.json();
      console.log("cooljo ", json2);
      console.log("Le images 2.0: ",  json2.find((image) => image.productId === parseInt(productId)))
      return json2.find((image) => image.productId === parseInt(productId))
    },



    getProductByID(id) {
      return productData.products.find(
        (product) => product.id === parseInt(id)
      );
    },
    populateDropdown() {
      let amounts = [];
      for (var i = 1; i <= MAXIMAL_ITEMS; i++) {
        amounts.push(i);
      }
      return amounts;
    },

    navigateToHome() {
      this.$router.push("/home");
    },
    navigateToCatalogue() {
      this.$router.push("/catalogue");

    },
    navigateToRegion(regionName) {
      this.$router.push("/region/" + regionName);
    },
    navigateToProduct(productId) {
      this.$router.push("/product/" + productId);
  },
  showWarningMessage() {
      return "Het minimale aankoopbedrag is 50 euro.";
    },
  calculateSubtotal() {
      let count = 0.0;
      this.$store.state.filteredCart.forEach(
        (item) => (count += item.amount * item.product.price)
      );
      return count;
    }
 
  },
  filters: {
    twoDecimals(value) {
      return value.toFixed(2);
    },
  },
};
