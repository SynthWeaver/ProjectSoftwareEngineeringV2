import Home from "../components/Home.vue";
import NotFound from "../components/NotFound.vue";
import Construction from "../components/Construction.vue";
import Scrolling from "../components/Scrolling.vue";
import Catalogue from "../components/Catalogue.vue";
import Product from "../components/Product.vue";
import EditProduct from "../components/EditProduct.vue";
import LoginPage from "../components/LoginPage.vue";
import AdminPage from "../components/AdminPage.vue";
import RegionOption from "../components/RegionOption.vue";
import { getCurrentUserById } from "../js/user.js";

// import RegisterPage from "../components/RegisterPage.vue";
import ShoppingCartDetails from "../components/ShoppingCartDetails.vue";
import Order from "../components/Order.vue";

//don't remove please
// import RegisterPage from "../components/RegisterPage.vue";

export default [
  {
    path: "/",
    component: Construction,
    name: "construction",
  },

  {
    path: "/order",
    component: Order,
    name: "Order",
  },
  {
    path: "/admin",
    component: AdminPage,
    name: "admin",
     // If youre not admin you cannot enter the next page
    beforeEnter: (to, from, next) => {
      //check first if you have admin rights
      checkAdminRights().then((response) => {
        if (response == true) {
          next()
        // If user is not an admin sent them back to the homepage
        } else {
          next("/login")
        }
      }
      ,error => {
        next("/login")
      })
    }
  },
  // DONT REMOVE THIS PLEASE
  // {
  //   path: "/register",
  //   component: RegisterPage,
  //   name: "register",
  // },
  {
    path: "/home",
    component: Home,
    name: "home",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/EditProduct",
    component: EditProduct,
    name: "EditProduct",

  },
  {
    path: "/scrolling",
    component: Scrolling,
    name: "Scrolling",
  },

  {
    path: "/editProduct",
    component: EditProduct,
    name: "editProduct",
    props: false,
  },
  {
    path: "/region/:regionName",
    component: RegionOption,
    name: "regionoption",
  },
  {
    path: "/product/:id",
    component: Product,
    name: "product",
    props: false,
    reuse: true,
  },
  {
    path: "/catalogue/:province",
    component: Catalogue,
    name: 'catalogue',

  },
  {
    path: "/catalogue",
    component: Catalogue,
    name: "catalogue",
  },
  {
    path: "/scdetails",
    component: ShoppingCartDetails,
    name: "shoppingCartDetails",
  },
  {
    path: "*",
    component: NotFound,
  },

  // DONT REMOVE THIS PLEASE
  // {
  //   path: "/register",
  //   component: RegisterPage,
  //   name: "register",
  // },
];

async function checkAdminRights() {
  return await getCurrentUserById();
}