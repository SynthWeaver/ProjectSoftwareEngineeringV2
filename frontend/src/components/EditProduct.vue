<template>
  <article>
    <div>
      <input
        class="title"
        v-model="message"
        placeholder="Enter product title"
      />
      <!-- <p>Message is: {{ message }}</p> -->
    </div>
    <div class="split_div">
      <div class="left">
        <div class="imageHolder">
          <img id="output" class="imageDisplay" />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            @change="onFileSelected"
          />
        </div>
      </div>

      <div class="right">
        <div>
          <textarea
            class="description"
            v-model="description"
            placeholder="Add a description for your product here"
          ></textarea>
        </div>

        <div class="selectionHolder">
          <div>
            <span>Provincie: </span>
            <select v-model="selectedProvince">
              <option disabled value="">Please select one</option>
              <option
                v-for="provinceItem in selectionOptions.province"
                :key="provinceItem"
              >
                {{ provinceItem }}
              </option>
            </select>
            <!-- <span>Selected: {{ selected }}</span> -->
          </div>

          <div>
            <span>Regio: </span>

            <select v-model="selectedRegion">
              <option disabled value="">Please select one</option>
              <option
                v-for="region in selectionOptions.region[selectedProvince]"
                :key="region"
              >
                {{ region }}
              </option>
            </select>
            <!-- <span>Selected: {{ region }}</span> -->
          </div>

          <div>
            <span>Category: </span>
            <select v-model="selectedCategory">
              <option disabled value="">Please select one</option>
              <option v-for="categoryItem in category" :key="categoryItem">
                {{ categoryItem }}
              </option>
            </select>
            <!-- <span>Selected: {{ selectedCategory }}</span> -->
          </div>

          <div>
            <span>Price in euros:</span>
            <input
              class="smallInput"
              placeholder="Name a price"
              v-model="price"
              @keypress="onlyForCurrency"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bottomButtons">
      <div class="bottomLeft">
        <button class="buttonConfirm">CANCEL</button>
      </div>
      <div class="bottomRight">
        <button class="buttonCancel" v-on:click="postdata">CONFIRM</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "Csstest",
  data() {
    return {
      selectedfile: null,
      message: null,
      description: null,
      selected: null,
      selectedProvince: null,
      selectedRegion: null,
      selectedCategory: null,
      region: null,
      price: null,

      //TODO VERPLAATS MET APICALL
      selectionOptions: {
        province: ["NoordHolland", "ZuidHolland"],
        region: {
          NoordHolland: ["Amsterdam", "Alkmaar"],
          ZuidHolland: ["Rotterdam", "Den Haag"],
        },
        category: [],
      },

      category: ["koelkastmagneet", "sieraden", "overige"],
      newData: {
        "Noord-Holland": [
          { Regions: ["Alkmaar", "Amsterdam"], doors: 4 },
          { model: "Maxima", doors: 4 },
          { model: "Skyline", doors: 2 },
        ],
        Ford: [
          { model: "Taurus", doors: 4 },
          { model: "Escort", doors: 4 },
        ],
      },
      provincedata: [
        {
          "Noord-Holland": {
            name: "Noord-Holland",
            regions: ["Amsterdam", "Alkmaar"],
            Image: "",
          },
        },
        {
          "Zuid-Holland": [
            {
              regions: ["Rotterdam", "Den Haag"],
              Image: "",
            },
          ],
        },
      ],
    };
    //};
  },

  methods: {
    async postdata() {
      let myObj = {
        name: this.message,
        description: this.description,
        province: this.selectedProvince,
        region: this.selectedRegion,
        category: this.selectedCategory,
        price: this.price,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify(myObj),
      };

      const response = await fetch(
        "http://localhost:3000/api/product",
        options
      );
      alert("Item is toegevoegd aan de catalogue");
      console.log(response);
    },
    //Sets image id "output" to the uploaded image.
    onFileSelected(event) {
      console.log("vue event" + event);
      this.selectedfile = event.target.files[0];
      var output = document.getElementById("output");

      output.src = URL.createObjectURL(this.selectedfile);
      output.onload = function () {
        URL.revokeObjectURL(output.src); // free memory
      };
    },
    //Only allows the user to input decimal values into input field.
    onlyForCurrency($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.price.indexOf(".") != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if (
        this.price != null &&
        this.price.indexOf(".") > -1 &&
        this.price.split(".")[1].length > 1
      ) {
        $event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.imageDisplay {
  width: 500px;
  height: 100%;
}
.description {
  width: 75%;
  height: 200px;
  margin-bottom: 10px;
}
.selectionHolder > div {
  display: grid;
  grid-template-columns: 20% 80%;
  margin-top: 5px;
}

select {
  width: 75%;
}

.smallInput {
  width: 35%;
}

.split_div {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
}
.bottomButtons {
  margin-top: 20px;
}

.buttonConfirm {
  width: 100%;
}

.buttonCancel {
  width: 100%;
}

.title {
  width: 40%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.bottomLeft {
  margin-left: 15%;
  width: 30%;
  float: left;
}

.bottomRight {
  margin-right: 15%;
  width: 30%;
  float: right;
}
.left {
  width: 100%;
  align-content: center;
}

.imageHolder {
  align-content: center;
  max-height: 700px;
  max-width: 80%;
  margin: auto;
}
</style>