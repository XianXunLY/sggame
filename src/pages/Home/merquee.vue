<template>
  <div class="marquee">
    <div class="marquee_box">
      <ul class="marquee_list" :class="{marquee_top:animate}">
        <li v-for="(item, index) in marqueeList" :key="index" @click="gototitle(item.id)">
          <!-- <span>{{item.text}}</span> -->
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["headlines"],
  created() {
    setInterval(this.showMarquee, 3000);
  },
  watch: {
    headlines(val) {
      this.marqueeList = this.headlines;
    }
  },
  methods: {
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0]);
        this.marqueeList.shift();
        this.animate = false;
      }, 500);
    },
    gototitle(id) {
      this.$router.push({ name: "Title", params: { id } });
    }
  },
  data() {
    return {
      animate: false,
      marqueeList: []
    };
  }
};
</script>
<style scoped>
div,
ul,
li,
span,
img {
  margin: 0;
  padding: 0;
  display: flex;
  box-sizing: border-box;
}

.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -25px;
}

.marquee_list li {
  height: 25px;
  width: 100%;
  line-height: 20px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.800915rem;
  color: #333;
  /* padding-left: 20px; */
}
/* .marquee_list li span {
  padding: 0 2px;
  
} */
</style>
