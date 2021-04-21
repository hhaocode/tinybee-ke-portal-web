<template>
  <div>
    <div class="block-header">
        <span>系统化学习路径</span>
        <span>网易云课堂六大课程体系，让学习有章有序</span>
    </div>
    <div class="card-wrapper">
      <div class="card-item hover-up" v-for="(grid, index) in grids" :key="index">
        <a class="arcus-grid" :href="grid.url">
          <img style="width:100%;" :src="grid.img" :alt="grid.title" srcset="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningPathGrid',
  data () {
    return {
      grids: [
        {
          id: '',
          url: '',
          title: '职场通用技能',
          img: 'https://edu-image.nosdn.127.net/b8cbbde8bc98409aad5227fde070df7d.png?imageView&quality=100'
        },
        {
          id: '',
          url: '',
          title: '编程与开发',
          img: 'https://edu-image.nosdn.127.net/9c3adc02cea44377a91c6716201bbe4c.png?imageView&quality=100'
        },
        {
          id: '',
          url: '',
          title: 'AI与数据',
          img: 'https://edu-image.nosdn.127.net/7594f6916fc94a16af474856d1de8786.png?imageView&quality=100'
        },
        {
          id: '',
          url: '',
          title: '产品与运营',
          img: 'https://edu-image.nosdn.127.net/29696616fe6e495a9b191244f2bd0bea.png?imageView&quality=100'
        },
        {
          id: '',
          url: '设计创意',
          title: '',
          img: 'https://edu-image.nosdn.127.net/96ee5f4a9b954c1991b17ca577aaa00a.png?imageView&quality=100'
        },
        {
          id: '',
          url: '',
          title: '电商运营',
          img: 'https://edu-image.nosdn.127.net/9957cb6a888e40f08c36ce6a96804d32.png?imageView&quality=100'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .card-item {
    width: 190px;
  }
}
</style>
