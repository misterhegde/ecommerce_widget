<template>
  <div>
    <div class="header">
      <div class="headerImage">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <b-icon
          v-b-toggle.my-sidebar
          icon="three-dots-vertical"
          style="cursor: pointer; float: right"
        ></b-icon>
      </div>

      <b-sidebar id="my-sidebar" title="Settings">
        <div>
          <span>Title</span
          ><b-form-checkbox
            class="switches"
            v-model="title"
            switch
          ></b-form-checkbox>
          <span>Image</span>
          <b-form-checkbox class="switches" v-model="image" switch>
          </b-form-checkbox>
          <span>Description</span>
          <b-form-checkbox class="switches" v-model="description" switch>
          </b-form-checkbox>
        </div>
        <div class="theme-options">
          Themes:
          <div
            id="theme-white"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-white' ? 'active' : ''}`"
          ></div>
          <div
            id="theme-blue"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-blue' ? 'active' : ''}`"
          ></div>

          <div
            id="theme-orange"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-orange' ? 'active' : ''}`"
          ></div>

          <div
            id="theme-purple"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-purple' ? 'active' : ''}`"
          ></div>

          <div
            id="theme-green"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-green' ? 'active' : ''}`"
          ></div>

          <div
            id="theme-black"
            @click="handleThemeClick"
            :class="`${getThemeName === 'theme-black' ? 'active' : ''}`"
          ></div>
        </div>
      </b-sidebar>
    </div>
    <div v-for="(item, id) in data.products" :key="id">
      <Item :title="item.title" :images="item.images" :html="item.body_html" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Item from "./Item";
import "@/assets/css/main.scss";

export default {
  components: {
    Item,
  },
  data() {
    return {
      data: "",
      page: 1,
      history: null,
      dataFromParent: "",
    };
  },

  async mounted() {
    console.log("you", window.top);
    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
    await eventer(messageEvent, this.getDataFromMainWindow, true);
    this.fetchProducts();
  },

  watch: {
    getPage() {
      this.fetchProducts();
    },
    getUrl() {
      this.fetchProducts();
    },
  },
  computed: {
    ...mapGetters(["getPage", "getThemeName", "getUrl"]),

    title: {
      get() {
        return this.$store.state.widgetSettings.title;
      },
      set(val) {
        this.$store.commit("toggleTitle", val);
      },
    },
    image: {
      set(val) {
        this.$store.commit("toggleImage", val);
      },
      get() {
        return this.$store.state.widgetSettings.image;
      },
    },
    description: {
      set(val) {
        this.$store.commit("toggleDescription", val);
      },
      get() {
        return this.$store.state.widgetSettings.description;
      },
    },
  },

  methods: {
    ...mapActions(["setPageAction", "setThemeNameAction", "setUrlAction"]),
    getDataFromMainWindow(e) {
      this.dataFromParent = e.data;
      console.log("forme", e);
      if (this.dataFromParent === "forw" || this.dataFromParent === "prev") {
        this.setPageAction(e.data);
      }
      if (e.data.includes("https")) this.setUrlAction(e.data);
    },

    fetchProducts() {
      //https://demo.swym.it/collections/mens/products.json?page=
      axios.get(`${this.getUrl}${this.getPage}`).then((res) => {
        this.data = res.data;

        window.scrollTo(0, 0);

        console.log("res", this.getUrl);
      });
    },

    handleThemeClick(event) {
      this.setThemeNameAction(event.target.id);
      console.log(event.target.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  object-fit: contain;
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 20;
}
.card {
  padding: 20px;
  margin-bottom: 20px;
}
.switches {
  position: relative;
  left: 20%;
}
span {
  position: relative;
  right: 20%;
  top: 12.5%;
}
</style>
<style>
#my-sidebar {
  background-color: #fafafa;
}
.b-sidebar-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.custom-control {
  margin-bottom: 20px;
}
</style>
