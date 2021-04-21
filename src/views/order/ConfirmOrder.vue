<template>
  <div class="cart-wrapper">
      <div class="cart-header">
        <div class="cart-header-wrapper">
          <div class="card-title">
            <div>
              <h1>确认订单</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-body">
        <div class="title-box">
          <div class="goods-info-title">商品信息</div>
          <a href="">我有疑问，需要反馈？</a>
        </div>
        <div class="detail-box">
          <ul class="detail-wrapper">
            <li class="detail-item" v-for="(orderItem, idx) in order.orderItems" :key="idx">
              <router-link href="" :to="`/course/intro/${orderItem.id}`">
                <img :src="orderItem.coverUrl" :alt="orderItem.title">
              </router-link>
              <div class="text-info-box">
                <router-link href="" :to="`/course/intro/${orderItem.id}`">
                  {{orderItem.title}}
                </router-link>
              </div>
              <div class="price-info">
                ￥{{orderItem.discountPrice || orderItem.originalPrice | amount}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    <div class="pay-box static">
      <div class="pay-box-wrapper">
        <div class="flex">
          <span>商品总金额：￥{{order.amount | amount}}</span>
          <span>应付：￥{{order.amount | amount}}</span>
        </div>
        <div>
          <button class="submit-order-btn" :disabled="!purchasable" @click="submitOrder">提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: { amount: '', orderItems: [] },
      purchasable: false,
      token: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const { contentId } = this.$route.query
      if (!contentId) {
        // 无效数据 TODO
        return
      }
      this.$store.dispatch('ums/computeOrder', contentId).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.order.orderItems = res.data
          this.token = res.uuid
          if (res.data.length) {
            this.order.amount = res.data[0].discountPrice || res.data[0].originalPrice
            this.purchasable = true
          }
        }
      })
    },
    submitOrder () {
      const data = { token: this.token, skus: [{ skuId: this.order.orderItems[0].id }], skuIds: [this.order.orderItems[0].id] }
      this.$post('/api/order/submit', data).then(res => {
        if (res.code === 0) {
          // 成功
          this.$router.replace({ path: '/o/pay-order', query: { orderNo: res.data.orderNo } })
        } else if (res.code === 50001) {
          this.$message.error(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-order-btn {
  cursor: pointer;
      padding: 11px 32px;
      font-size: 16px;
      line-height: 24px;
      border-radius: 24px;
      border-style: solid;
      border-width: 1px;
      transition: all .3s;
      color: #fff;
      background-color: #f20d0d;
      border-color: #f20d0d;
      opacity: 1;
      &:hover {
        color: #fff;
        border-color: #c20a0a;
        background: #c20a0a;
        opacity: 1;
      }
    }
</style>
