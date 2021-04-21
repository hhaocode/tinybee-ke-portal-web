<template>
  <div class="index-swiper-wrapper">
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(item,index) in carousels" :key="index">
          <a :title="item.bannerTitle" class="item" :href="item.targetUrl ? item.targetUrl : 'javascript:;'" :target="item.targetUrl ? item.target : false" :style="{'background-image':'url('+ item.coverUrl +')'}"></a>
      </swiper-slide>
                <!-- 分页器 -->
      <div class="swiper-pagination"  slot="pagination"></div>
                <!-- 左右箭头 -->
      <div class="swiper-button-prev btn prex-btn" slot="button-prev">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="swiper-button-next btn next-btn" slot="button-next">
        <i class="fa fa-angle-right"></i>
      </div>
    </swiper>
  </div>

</template>

<script>
// import fetchTopBanner from '@/mock/home/fetchTopBanner.json'
import swiper from '@/mixins/swiper'
export default {
  name: 'IndexCarousel',
  mixins: [swiper],
  data () {
    return {
      swiperOption: {
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true
        },
        // 自动轮播
        autoplay: {
          delay: 5000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        // 开启循环模式
        loop: true,
        on: {
          resize: function () {
            // 窗口变化了
            // console.log()
            // _this.$refs.swiper.$swiper.update(true)
            // console.log('size')
          }
        }
      },
      carousels: []
    }
  },
  computed: {
    swiper () {
      return this.$refs.swiper.$swiper
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    this.$get('/api/open/base/getAdvertisement', { params: { platform: 1, location: 1 } }).then(res => {
      this.carousels = res.data || []
    })
  }
}
</script>

<style lang="scss" scoped>
// .swiper-container .swiper-button-hidden{ opacity : 0; }
.index-swiper-wrapper {
  position: relative;
  width: 966px;
  height: 360px;
  // border-radius: 6px;
  ::v-deep .swiper-container {
    width: 100%;
    border-radius: 8px;
    .swiper-wrapper {
      width: 100%;
    }
  }
  &:hover {
    .btn {
      // display: flex;
      // visibility: visible;
    }
  }
  .btn {
    &::after {
      content: "";
    }
    // display: none;
    // visibility: hidden;
    font-size: 28px;
    height: 40px;
    width: 40px;
    text-align: center;
    background-color: rgba(1, 1, 1, 0.1);
    border-radius: 50%;
    color: #f2f2f2;
    font-weight: 400;
    &:hover {
      color: #ffffff;
      background-color: rgba(1, 1, 1, 0.4);
    }
  }

  ::v-deep .item {
    margin: 0;
    color: transparent;
    display: block;
    width: 100%;
    height: 360px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    border-radius: 8px;
  }
}
</style>
