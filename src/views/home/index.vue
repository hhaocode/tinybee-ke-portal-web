<template>
  <div class="min-w">
    <div class="w flex space-between" style="padding: 30px 0;">
      <IndexCarousel />
      <IndexUserArea />
    </div>
    <div class="w">
      <div class="interest-guide-wrapper">
        <div class="interest-guide">
          <div class="title">以下根据你的学习兴趣推荐</div>
          <a href="">更改兴趣<i class="fa fa-angle-right"></i></a>
        </div>
      </div>
    </div>

    <!-- 训练营 -->
    <div></div>

    <!-- 公开课 -->
    <div>
    </div>

    <!-- 学习路线 -->
    <div></div>

    <!-- 上新 -->
    <div class="">
      <div class="w">
        <ArcusModuleTitle title="新上好课" moreUrl="/course/list"></ArcusModuleTitle>
      </div>
      <div class="course-list-wrapper w">
         <a class="course-item-box" :href="`/course/intro/${course.id}`" v-for="(course, index) in courses" :key="index">
         <div class="cover">
            <img :src="course.coverUrl">
          </div>
          <div class="title">
            {{course.title}}
            </div>
          <div>
            <span v-if="course.free">
              免费
            </span>
            <span v-else>
            <span v-if="course.discountPrice">
              <span>{{course.discountPrice}}</span>
            </span>
            <span v-else>{{course.originalPrice}}</span>
            </span>
          </div>
         </a>
      </div>
    </div>
     <!-- 专栏 -->
    <div></div>
    <!-- 每日一课 -->
    <div class=""></div>
     <!-- 文章 -->
    <!-- <div v-if="directionCourses && directionCourses.length" class="index-block-area">
      <div class="w">
        <tabs :activeName="directionCoursesActive" gutter="15px">
          <div slot="left">
            <h3>进站必学</h3>
          </div>
          <template v-for="(direction, idx) in directionCourses">
          <tab-pane v-if="direction.courses && direction.courses.length" :name="idx" :label="direction.name"  :key="idx">
            <div class="course-list-wrapper">
              <a class="course-item-box" :href="`/course/intro/${course.id}`" v-for="(course, index) in direction.courses" :key="index">
                <div class="cover">
                  <img :src="course.coverUrl">
                </div>
                <div class="title">
                  {{course.title}}
                </div>
                <div>
                  <span v-if="course.free">
                    免费
                  </span>
                  <span v-else>
                    <span v-if="course.discountPrice">
                      <span>{{course.discountPrice}}</span>
                    </span>
                    <span v-else>{{course.originalPrice}}</span>
                  </span>
                </div>
              </a>
            </div>
          </tab-pane>
          </template>
        </tabs>
      </div>
    </div> -->
    <!-- <div class="w">

      <LearningPathGrid />
    </div> -->
  </div>
</template>

<script>
import IndexCarousel from './components/IndexCarousel'
import IndexUserArea from './components/IndexUserArea'
import ArcusModuleTitle from '@/components/common/ArcusModuleTitle'
export default {
  name: 'HomeIndex',
  components: { IndexCarousel, IndexUserArea, ArcusModuleTitle },
  data () {
    return {
      courses: []
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.directionCoursesActive = 0
    // })
    this.initData()
  },
  methods: {
    initData () {
      // this.$get('/api/open/web/index/recommend/entry').then(res => {
      //   this.directionCourses = res.data || []
      //   this.$nextTick(() => {
      //     this.directionCoursesActive = 0
      //   })
      // })
      // 视频课程
      this.$get('/api/open/web/index/newCourses').then(res => {
        this.courses = res.data || []
      })
      // 训练营
      this.$get('/api/open/web/index/listCourseByType/6').then(res => {
        this.camp = res.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #1DD39A;
.index-block-area {
  padding: 40px 0;
}
.course-system-wrapper {
  justify-content: space-between;
  .course-system-item {
    height: 180px;
    height: 120px;
    a {
      display: block;
      height: 100%;
      height: 100%;
      img {
        height: 100%;
        height: 100%;
      }
    }
  }
}
.live-wrapper {
  .live-item {
    width: 400px;
    padding: 10px 20px 10px 10px;
    margin-bottom: 20px;
    &:hover {
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
      border-radius: 2px;
    }
    .live-item-container {
      display: flex;
      justify-content: space-between;
      .cover {
        height: 80px;
        width: 80px;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .content {
        width: 280px;
      }
    }
  }
}
.micro-professional-wrapper {
  .micro-professional-container {
    justify-content: space-between;
    .micro-professional-item {
      width: 290px;
      .cover {
        width: 280px;
        height: 161px;
        overflow: hidden;
        &:hover {
          img {
            transform: scale(1.2);
            transition: .3s;
          }
        }
        img {
          height: 100%;
          width: 100%;
          border-radius: 6px 6px 0 0;
          transition: .3s;
        }
      }
    }
  }
}
.seckill-wrapper {
  .seckill-container {
    justify-content: space-between;
    .seckill-item {
      width: 230px;
      .cover {
        width: 225px;
        height: 125px;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          border-radius: 6px 6px 0 0;
        }
      }
    }
  }
}
.interest-guide-wrapper {
  padding: 20px 0;
  .interest-guide {
    padding-left: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    background: #ECF7ED;
    border-radius: 3px;
    .title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-right: 20px;
    }
    a {
      color: $mainColor;
    }
  }
}
</style>
