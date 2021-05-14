<template>
  <div>
    <button v-if="this.setting !== false">THIS WORKS</button>
    <!-- <button @click="$router.push('/about')">NEXT</button> -->
    <button @click="page++">newpage</button>

    <button v-for="(item, id) in prod" :key="id">{{ item }}</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      prod: "",
      page: 1,
      history: null,
      setting: null,
    };
  },

  mounted() {
    this.fetchProducts();
    // let a = window.parent.document.getElementsByTagName("head");
    // console.log("parent", a);
    // parent.document.body.style.backgroundColor = "red";

    // document.addEventListener("backbutton", this.yourCallBackFunction, false);
    // console.log("history", this.prod);
    if (window.history.state !== this.history) {
      this.page++;
      this.history = window.history.state;
      alert("this");
    }
    if (window.history.state < this.history) {
      this.page--;
      this.history = window.history.state;
    }
    if (window.history.state === null) {
      this.setting = false;
      this.page = 1;
      this.history = window.history.state;
    }

    // window.onpopstate = function () {
    //   alert("browser-back");
    // };
  },
  watch: {
    page() {
      this.fetchProducts();
    },
  },

  methods: {
    fetchProducts() {
      axios
        .get(
          `https://demo.swym.it/collections/mens/products.json?page=${this.page}`
        )
        .then((res) => {
          this.prod = res.data;

          console.log("res", res);
        });
    },
    pushstate() {
      window.history.back();
    },

    getsome() {
      let a = window.parent.document.getElementById("#PageContainer");
      console.log("abc", a);
    },
  },
  updated() {
    window.addEventListener("onpopstate", function () {
      console.log("go back");
    });
  },
};
</script>

<style lang="scss" scoped></style>
