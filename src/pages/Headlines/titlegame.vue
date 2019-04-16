<template>
  <div class="titlegame">
    <div
      class="Mgame"
      v-for="item in titlegame.headlines"
      :key="item.id"
      @click="gotoTitle(item.id)"
    >
      <div class="game">
        <div class="gameimg">
          <img :src="item.cover.url" alt>
        </div>
        <div class="comment">
          <div class="comment_title">{{item.title}}</div>
          <div class="comment_bottom">
            <div class="comment_time">2019-3-14</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["q"],
  data() {
    return {
      titlegame: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    gotoTitle(id) {
    	this.$store.state.isShowTagger=false;
      this.$router.push({ name: "Title", params: { id } });
    },
    async getData() {
      // console.log("q", typeof this.q);
      let url = "/api/headlines.json";
      let { data } = await this.$axios(url, {
        params: {
          sonkwo_client: "mobile",
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          page: 1,
          per: 10,
          "q[section_id_in]": this.q
        },
        headers: {
          Accept: "application/vnd.sonkwo.v5+json",
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "max-age=0, private, must-revalidate",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "x-requested-with,content-type"
        }
      });
      this.titlegame = data;
      // this.banners = this.homedata.mobile_banner.banners;
      // console.log(this.titlegame);
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.titlegame {
  background: #fff;
}
.Mgame {
  width: 100%;
  height: 4.118993rem;
}
.game {
  width: 100%;
  height: 4.118993rem;
  background: #fff;
  padding: 0.686499rem;
  display: flex;
  flex-direction: row;
  border-bottom: 0.048627rem solid #f5f5f5;
}
.gameimg {
  width: 4.347826rem;
  height: 2.631579rem;
}
.gameimg img {
  width: 100%;
  height: 100%;
}
.comment {
  /* width: 12.414188rem; */
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 2.631579rem;
  padding-left: 0.686499rem;
}
.comment_title {
  font-size: 0.686499rem;
  color: #333333;
  margin-top: -0.3125rem;
  line-height: 1rem;
  width: 100%;
  height: 2.002288rem;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  text-overflow: ellipsis;
  /* display: -webkit-box;
    -webkit-line-clamp: 2; */
}
.comment_bottom {
  display: flex;
  flex-direction: row;
  flex: 1;
  color: #999;
  font-size: 0.549199rem;
  line-height: 0.549199rem;
  margin-top: 0.171625rem;
}
</style>

