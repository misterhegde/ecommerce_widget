<template>
  <div>
    <div :class="'item' + ' ' + getThemeName">
      <div class="item__header">
        <b-avatar
          class="item__avatar"
          src="https://swym.it/wp-content/uploads/2020/03/cropped-swym_engage_favicon-270x270.png"
        ></b-avatar>
        <h3>Swym</h3>
      </div>
      <div v-if="$store.state.widgetSettings.image === 'true'">
        <div v-for="i in [currentIndex]" :key="i" class="item__imagecontainer">
          <img class="item__image" :src="currentImg.src" alt="" />
          <div class="item__icons">
            <b-icon
              style="margin-left: 5px"
              @click.prevent="prev"
              icon="arrow-left-circle-fill"
            ></b-icon>
            <b-icon
              style="margin-right: 5px"
              @click.prevent="next"
              icon="arrow-right-circle-fill"
            ></b-icon>
          </div>
        </div>
      </div>

      <h4
        class="item__text"
        v-if="$store.state.widgetSettings.title === 'true'"
      >
        {{ title }}
      </h4>
      <div
        class="item__description"
        v-html="html"
        v-if="$store.state.widgetSettings.description === 'true'"
      ></div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/item.scss";
import { mapGetters } from "vuex";

export default {
  props: ["title", "images", "description", "html"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["getThemeName"]),
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
  methods: {
    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },
};
</script>

<style scoped>
.item {
  max-width: 500px;
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 45px;
}
.item__header {
  display: flex;
  align-items: center;
  padding: 15px;
}
.item__avatar {
  margin-right: 10px;
  background: #fafafa;
}
.item__image {
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}

.item__text {
  font-weight: normal;
  padding: 20px;
}

.item__imagecontainer {
  position: relative;
}
.item__icons {
  /* position: absolute; */
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  opacity: 0.7;
  transition: 0.3s ease;
  background-color: transparent;
  top: 50%;
  cursor: pointer;
}
</style>
