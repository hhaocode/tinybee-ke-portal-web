<template>
  <div>
    <div class="container-padding-20">
      <div class="flex row space-between study-options">
        <div>
          <h3>课程表</h3>
        </div>
        <div>
          <span>直播日历</span>
        </div>
      </div>
      <div class="integral-info">
        <div>
          <span>累积积分25618，可兑换余额256.18</span>
          <span>兑换奖励</span>
        </div>
        <div>
          <span>积分规则</span>
        </div>
      </div>
      <div class="study-statistics-wrapper">
        <div class="study-statistics-item">
          <div class="title">今日上课</div>
          <div class="info">
            <span class="number">0</span>
            <span class="unit">分钟</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="study-statistics-item">
          <div class="title">获得积分</div>
          <div class="info">
            <span class="number">0</span>
            <span class="unit">分</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="study-statistics-item">
          <div class="title">高于平台</div>
          <div class="info">
            <span class="number">0%</span>
            <span class="unit">学员</span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider-block-h"></div>
    <div class="container-padding-20">
      <no-data :no-data="!courseData.records || !courseData.records.length"></no-data>
      <ul>
        <li class="course-item" v-for="(course, index) in courseData.records" :key="index">
          <div class="cover">
            <img v-if="course.coverUrl" :src="course.coverUrl" alt="">
          </div>
          <div class="content">
            <div><span></span><router-link :to="`/course/go/${course.id}`">{{course.title}}</router-link></div>
          </div>
        </li>
      </ul>
      <div v-if="courseData.total" class="text-center">
        <pagination :current-page="param.page"
            :total="courseData.total"
            :page-size="param.size"
            @current-change="current => param.page = current"
            layout="total, prev, pager, next, jumper"
          ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
// const initPageContent = {
//   records: [],
//   total: 0
// }
export default {
  name: 'StudyInfo',
  data () {
    return {
      courseData: { total: 0, records: [] },
      param: {
        page: 1,
        size: 10
      }
    }
  },
  mounted () {
    this.$get('/api/ums/user-course/page').then(res => {
      this.courseData = res.data || { total: 1, records: [] }
    }).catch(() => {
      // this.courseData = []
    })
  }
}
</script>

<style lang="scss" scoped>
.course-item {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  .cover {
    width: 160px;
    margin-right: 30px;
    img[src] {
      width: 160px;
      height: 98px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #d9dde1;
    position: relative;
    padding-bottom: 28px;
    flex: 1;
    // width: 730px;
  }
}
.study-options {
  padding: 10px 0 20px;
}
.integral-info {
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  color: #777;
  display: flex;
  padding: 15px 0;
  flex-direction: row;
  justify-content: space-between;
}
.study-statistics-wrapper {
  // margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .divider {
    height: 60px;
    width: 1px;
    background: #e8e8e8;
  }
  .study-statistics-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    .title {
      font-size: 18px;
      // text-align: center;
      margin-bottom: 20px;
    }
    .info {
      text-align: center;
      .number {
        font-size: 20px;
      }
      .unit {
        font-size: 12px;
      }
    }
  }
}
</style>
