<template>
  <div class="cooleDiv">
    <div class="left">
      <!-- <div class="back">
        <button class="btn-home" @click="navigateToCatalogue()">
          Terug naar de shop
        </button>
      </div> -->

      <div class="information">
        <span>
          <h1>Uw Gegevens</h1>
          De producten worden geleverd naar het opgegeven adress op het moment
          van bestelling. Indien nodig kunt u deze nu nog wijzigen ook al bent u
          ingelogd.
        </span>
      </div>

      <div class="userinfo">
        <div class="inputgrid">
          Naam
          <input class="input" v-model="name" placeholder="" />
        </div>
        <div class="inputgrid">
          Straat
          <input class="input" v-model="street" placeholder="" />
        </div>

        <div class="streetgrid">
          <div>
            <div class="inputgrid">
              Nummer
              <input class="input" v-model="number" placeholder="" />
            </div>
          </div>

          <div clas="fill"></div>

          <div id="addon-grid">
            Toevoeging
            <input class="input" v-model="addon" placeholder="" />
          </div>
        </div>

        <div class="inputgrid">
          Postcode
          <input class="input" v-model="postcode" placeholder="" />
        </div>
        <div class="inputgrid">
          Email
          <div>
            <input class="input" v-model="email" placeholder="" />
          </div>
        </div>

        <div class="terms">
          Ik accepteer de voorwaarden

          <input
            class="check"
            type="checkbox"
            v-model="toggle"
            true-value="yes"
            false-value="no"
          />
        </div>
      </div>
    </div>

    <div class="fill"></div>

    <div class="right">
      <h1>Uw bestelling</h1>
      <div class="orderview">
        <div class="order">
          <ul>
            <li
              v-for="product in this.filteredCart"
              :key="product.id"
              @click="navigateProduct(product.product.id)"
            >
              <span class="left" style="width: 60%"
                >{{ product.product.name }}
              </span>

              <span class="right" style="width: 40%">
                €{{ product.product.price }}
                <img class="img-icon" :src="product.product.imageUrls[0]" />

                {{ product.amount }}X
              </span>

              <!-- Deel de span op in 2 delen. Allebei 50% width. De ene float left andere float right. -->
            </li>
          </ul>
        </div>
        <div class="total">
          <div class="floatLeft">Totaal prijs incl. btw</div>
          <div class="floatRight">€{{ this.roundedSubtotal }}</div>
        </div>
      </div>
      <div class="options">
        <!-- <div class="select">
          <div class="optionText">Betaalmethode</div>
          <select v-model="selectedPaymentMethod" class="option">
            <option disabled value="">Selecteer een optie</option>
            <option v-for="method in paymentMethod" :key="method">
              {{ method }}
            </option>
          </select>
        </div> -->

        <p class="conditions">Minimaal bedrag om te bestellen is 50 euro</p>

        <div class="select">
          <div class="optionText">Bank</div>
          <select v-model="selectedBank" class="option">
            <option disabled value="">Selecteer een optie</option>
            <option
              v-for="bank in banks"
              :key="bank"
              v-bind:value="bank.issuerid[0]"
            >
              {{ bank.issuername[0] }}
            </option>
          </select>
        </div>
      </div>

      <div class="payment">
        <button v-on:click="createOrder()" class="pay">Betalen</button>
      </div>
    </div>
  </div>
</template>

<script>
import productData from "../data/ProductData";
import { sendGmail } from "../js/mail.js";
import mixins from "../mixins/mixins.js";
export default {
  computed: {
    itemsInCart() {
      return this.$store.state.itemsInCart;
    },
    filteredCart() {
      return this.$store.state.filteredCart;
    },

    calculateSubtotal() {
      console.log(this.$store.state.filteredCart);
      let count = 0.0;
      this.$store.state.filteredCart.forEach(
        (item) => (count += item.amount * item.product.price)
      );
      return count;
    },

    roundedSubtotal() {
      return (Math.round(this.calculateSubtotal * 100) / 100).toFixed(2);
    },
  },
  asyncComputed: {
    myResolvedValue() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Changed Value!"), 1000);
      });
    },
  },
  async mounted() {
    let json;
    let response = await fetch("/api/directories", {});
    console.log(response);
    json = await response.json();
    console.log(json);
    this.banks = json;
  },
  mixins: [mixins],
  methods: {
    navigateProduct(id) {
      this.$router.push("/product/" + id);
    },
    async sendMail() {
      console.log("Welcome to the front-end!");
      console.log("beneeath status");

      const status = await sendGmail();
      console.log(JSON.stringify(await status.mailstatus));

      if (JSON.stringify(await status.mailstatus) == "true") {
        alert("succesfully sent mail");
      } else {
        alert("Oops, something went wrong");
      }
    },
    checkOrder() {
      if (this.calculateSubtotal >= 50) {
        console.log("true, " + this.calculateSubtotal);
        return true;
      } else {
        alert("Subtotal less than 50");
        return false;
      }
    },

    /**
     * It would be better to pass all productId's and quantities in an array to the backend
     * and let the backend create all productOrders at once. However, considering the deadline
     * this won't be implemented.
     */
    async createProductOfOrder(orderId, productId, quantity) {
      console.log("createPofOCalled");
      let productOrderInfo = {
        OrderId: orderId,
        ProductId: productId,
        quantity: quantity,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(productOrderInfo),
      };
      let response = await fetch("/api/productOrder", options, {});

      console.log(response);

      let status = response.status;
      let text = await response.text();

      console.log("Status is: " + status);
      console.log("Orderproduct response: " + text);
      return response;
    },

    //Checks whether order Total is >50 and creates order afterwards.
    async createOrder() {
      if (this.selectedBank == null) {
        alert("no bank selected");
        return;
      }
      if (this.checkOrder()) {
      } else {
        return;
      }

      let productHolder = this.filteredCart;
      let allProducts = [];
      productHolder.forEach((element) => {
        //Replace quantity met echte quantity
        allProducts.push({
          ProductId: element.product.id,
          quantity: element.amount,
        });
      });

      let orderInfo = {
        userEmail: this.email,
        products: allProducts,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      };
      let response = await fetch("/api/realorder", options, {});

      let body = await response.json();
      console.log(body);
      let status = response.status;
      console.log("orderstatus = " + status);

      if (status != 200) {
        console.log("something went wrong");
        return;
      }

      console.log("subtotal is equal to: " + this.calculateSubtotal);

      await this.initiateTransaction();
    },

    //Requests a transactionUrl from backend and sets this.url equal to it. Afterwards opens that Url.
    async initiateTransaction() {
      let body;
      console.log(this.selectedBank);

      let total = this.roundedSubtotal * 100;
      let transactionInfo = {
        amount: total,
        issuerId: this.selectedBank,
      };

      console.log("transaction info is");
      console.log(transactionInfo);
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(transactionInfo),
      };

      let response = await fetch("/api/transactionurl", options, {});
      body = await response.text();
      this.url = body;
      console.log(body);

      window.open(
        this.url,
        "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
      );

      this.sendMail();

      return body;
    },
  },

  data() {
    return {
      selectedPaymentMethod: null,
      selectedBank: null,
      productData,
      paymentMethod: ["ideal"],
      banks: ["ING", "Rabobank"],
      name: null,
      email: null,
      street: null,
      postcode: null,
      number: null,
      addon: null,
      toggle: null,
      amount: null,
      url: "https://www.w3schools.com",
      productArray: [
        { ProductId: 1, quantity: 3 },
        { ProductId: 1, quantity: 3 },
        { ProductId: 1, quantity: 3 },
        { ProductId: 1, quantity: 3 },
        { ProductId: 1, quantity: 3 },
      ],
    };
  },

  name: "Order",
};
</script>

<style scoped>
.cooleDiv {
  border-top: 1px;
  width: 100%;
  display: grid;
  grid-template-columns: 47.5% 5% 47.5%;
}

.left {
  float: left;
  width: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: left;
  /* border-style: */
}
.right {
  float: right;
  width: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  border-right: 1px;
  text-align: right;
}

.check {
  float: right;
}

.back {
  height: 15%;
  width: 70%;
  margin-left: 10%;
}

.optionText {
  width: 20%;
  float: left;
}
.select {
  width: 80%;
  margin-top: 5px;
  float: left;
}

.backButton {
  width: 100%;
  margin-top: 10px;
}
.orderview {
  width: 80%;
  border-left: 1px solid black;

  /* border-style: solid;
  border-width: 1px; */
  /* margin:auto; */
}
.order {
  border-bottom: 1px solid black;
  width: 100%;
}

.inputgrid {
  display: grid;
  grid-template-columns: 5em 90%;
}
#addon-grid {
  display: grid;
  grid-template-columns: 5.5em 85%;
}
.streetgrid {
  display: grid;
  /*  grid-template-columns: 40%  13% 41%;
*/
  grid-template-columns: 37% 19% 38%;
}

.totalhold {
  width: 100%;
  margin-left: 5px;
}
.total {
  /* OVERFLOW HIDDEN IS NODIG, ANDERS KOMT BORDER LIJN NIET MEE*/
  overflow: hidden;
  padding-left: 5px;
  margin-top: 5px;
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.smallinput {
  width: 100%;
  margin-right: 10em;
}

.input {
  margin-bottom: 10px;
  width: 100%;
}

.rightMargin {
  margin-right: 2em;
}

.img-icon {
  width: 30px;
  height: 30px;
}

.options {
  margin-top: 15px;
}
.option {
  width: 70%;
  float: right;
}

.userinfo {
  margin: auto;
  margin-top: 10px;
  width: 80%;
}
.terms {
  margin-top: 10px;
  /* width: 80%; */
}

.conditions {
  margin-top: 20px;
  width: 80%;
  display: flex;
  justify-content: center;
}
.payment {
  margin-top: 10%;
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: center;
}
.pay {
  width: 70%;
  height: 100%;
}
.information {
  width: 80%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 4%;
}

.btn-home {
  width: 50%;
  height: 100%;
}
</style>
