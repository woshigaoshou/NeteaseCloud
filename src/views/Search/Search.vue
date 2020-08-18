<template>
  <div>
    <TopBar class="TopBar">
      <div slot="left" class="icon-arrow-left" @click="returnHistory"></div>
      <input type="text" slot="center" class="search" v-model="keywords" :placeholder="showKeyword" />
      <div slot="right" class="icon-search2" @click="search"></div>
    </TopBar>
    <hotRank :title="title" :hotRank="hotRank" @hotRankClick="hotRankClick" v-show="!isSearch"></hotRank>
    <searchList :songs="songs" v-show="isSearch"></searchList>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";
import hotRank from "./childComp/hotRank";
import searchList from "./childComp/searchList";

import { returnHistoryMixin, routerSelectMixin } from "@/common/mixin";
import {
  getHotSearch,
  getMultimatch,
  getSearchDefault,
  getSearchSuggest,
  getSearchData
} from "@/network/search";

export default {
  name: "Search",
  components: {
    TopBar,
    hotRank,
    searchList
  },
  mixins: [returnHistoryMixin, routerSelectMixin],
  data() {
    return {
      keywords: "",
      title: "热搜榜",
      hotRank: [],
      showKeyword: "",
      isSearch: false,
      songs: []
    };
  },
  methods: {
    //网络请求
    getHotSearch() {
      getHotSearch().then(res => {
        this.hotRank = res.data.slice(0, 10);
      });
    },
    getSearchDefault() {
      getSearchDefault().then(res => {
        this.showKeyword = res.data.showKeyword;
      });
    },
    getSearchSuggest(keywords) {
      getSearchSuggest(keywords).then(res => {
        console.log(res);
      });
    },
    getMultimatch(keywords) {
      getMultimatch(keywords).then(res => {
        console.log(res);
      });
    },
    getSearchData(keywords) {
      getSearchData(keywords).then(res => {
        console.log(res);
        this.songs = res.result.songs;
      });
    },
    //方法
    hotRankClick(keywords) {
      // console.log(keywords);
      this.keywords = keywords;
      // this.getSearchData(this.keywords);
      this.routerSelect(this.keywords);
    },
    search() {
      if (this.keywords === "") {
        // this.getSearchData(this.realkeyword);
        this.routerSelect(this.showKeyword);
      } else {
        // this.getSearchData(this.keywords);
        this.routerSelect(this.keywords);
      }
    }
  },
  created() {
    this.getHotSearch();
    this.getSearchDefault();
  },
  mounted() {
    this.isSearch = this.$route.query.keywords ? true : false;
    if (this.isSearch) {
      this.getSearchData(this.$route.query.keywords);
    }
  },
  watch: {
    /* keywords(newValue, oldValue) {
      if (newValue !== "") {
        console.log(newValue);

                this.getSearchSuggest(newValue);
        this.getMultimatch(newValue);
        this.getSearchData(newValue);
      }
    } */
    $route(newValue) {
      console.log(newValue);
      if (typeof newValue.query.keywords === "undefined") {
        this.isSearch = false;
        this.keywords = "";
      } else {
        this.isSearch = true;
        this.getSearchData(newValue.query.keywords);
      }
    }
  }
};
</script>
<style scoped>
.icon-arrow-left {
  padding: 0.5vh 0 0;
  color: #888;
}
.search {
  border: 0;
  border-bottom: 1px solid rgb(175, 172, 172);
  width: 100%;
  padding: 1vh 0;
  outline: none;
  font-size: 4.3vw;
  color: #888;
}
.TopBar {
  margin-bottom: 2vh;
}
.icon-search2 {
  margin-top: 0.6vh;
  color: #888;
}
</style>