<template>
  <article>
    <div class="topgrid">
      <div class="home-div">
        <button class="btn-home" @click="navigateToHome()">
          Terug naar home
        </button>
      </div>
      <div class="top-text" @click="navigateToCatalogue()">
        Artikelen {{ this.region }}
      </div>
    </div>

    <section class="master-grid">
      <div class="article-grid">
        <div class="top-article" @click="navigateToCatalogue()">Magneten</div>
        <div class="bottom-article" @click="navigateToCatalogue()">
          {{ this.region }}
        </div>
      </div>
    </section>

    <section class="master-grid">
      <div class="article-grid">
        <div class="top-article" @click="navigateToCatalogue()">Overig</div>
        <div class="bottom-article" @click="navigateToCatalogue()">
          {{ this.region }}
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  methods: {
    navigateToHome() {
      this.$router.push("/home");
    },
    navigateToCatalogue() {
      this.$router.push("/catalogue");
    },
    print() {},
  },
  created() {
    this.region = this.$route.params.regionName;
  },
};
</script>

<style scoped>
.top-text {
  font-size: 80px;
  font-style: bold;
  margin-top: 5%;
  justify-content: center;
}
.topgrid {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto auto;
}
.btn-home {
  margin-top: 5%;
  font-size: 30px;
  padding: 5%;
  text-align: center;
  width: auto;
  height: 60%;
}

.master-grid {
  padding-top: 5%;
  display: grid;
  grid-template-columns: 50%;
  justify-content: center;
}
.article-grid {
  grid-template-columns: 2 (auto);
  grid-template-rows: 60% 40%;
  align-content: center;
}
.top-article {
  text-align: center;
  color: white;
  background-color: black;
  font-size: 50px;
  padding-top: 2%;
  height: 60px;
}

.bottom-article {
  padding-top: 2%;
  color: black;
  background-color: white;
  font-size: 40px;
  height: 60px;
  border: black;
  border-style: solid;
  text-align: center;
}
</style>

