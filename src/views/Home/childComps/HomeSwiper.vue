<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in banners" :key="index" class="swiper-item">
      <img :src="item.pic" alt />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";

export default {
  name: "HomeSwiper",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: 2000,
        loop: true,
        pagination: ".swiper-pagination",
        autoplayDisableOnInteraction: false
      }
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.swiper-item {
  text-align: center;
}
.swiper-item img {
  width: 95%;
  height: 100%;
  border-radius: 3vw;
}
</style>