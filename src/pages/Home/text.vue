<template>
  <div class="picture-play" @touchstart="touchesstart" @touchend="touchesend">
    <ul>
      <li
        v-for="(i,index) in 10"
        :key="index"
        :class="{'active': i === currentIndex, 'prev': i === currentIndex - 1, 'next': i === currentIndex + 1}"
      >
        <div class="item">
          <img src alt>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.picture-play {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.picture-play ul {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
}
.picture-play ul li {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transform: translateY(100vh);
  transition: transform 0.3s;
}
.picture-play ul li .prev {
  display: block;
  opacity: 1;
  transform: translateY(-100vh);
}
.picture-play ul li .active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
.picture-play ul li .next {
  display: block;
  opacity: 1;
  transform: translateY(100vh);
}
.picture-play ul li div {
  width: 100%;
  height: 100%;
}
.picture-play ul li div img {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      startClient: 0,
      currentIndex: 1
    };
  },
  methods: {
    touchesstart(e) {
      e.preventDefault();
      e = e || event;
      if (e.touches.length === 1) {
        this.startClient = e.touches[0].clientY;
      }
    },
    touchesend(e) {
      e.preventDefault();
      e = e || event;
      const delta = 30;
      if (this.startClient - e.changedTouches[0].clientY <= -delta) {
        this.currentIndex = this.currentIndex - 1;
        if (this.currentIndex === 0) {
          this.currentIndex = 1;
        }
      } else if (this.startClient - e.changedTouches[0].clientY >= delta) {
        this.currentIndex = this.currentIndex + 1;
        if (this.currentIndex >= 10) {
          this.currentIndex = 10;
        }
      }
    }
  }
};
</script>