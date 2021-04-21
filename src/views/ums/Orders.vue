<template>
  <div>
    <div class="container-padding-20">
      <div class="order" v-for="order in orders" :key="order.id">
        <div class="order-header">
          <span>订单号：{{order.orderNo}}</span>
          <span>创建时间：{{order.orderTime}}</span>
          <span>订单类型：{{orderTypeMap[order.type]}}</span>
          <span>订单状态：{{orderStatusMap[order.orderStatus]}}</span>
          <button @click="handleGoPay(order)" v-if="order.orderStatus === 1">去支付</button>
        </div>
        <ul class="order-items">
          <li v-for="orderItem in order.orderItems" :key="orderItem.id" class="order-item">
            <div class="flex row">
              <div>
                <img class="cover" :src="orderItem.coverUrl" alt="">
              </div>
              <div>
                {{orderItem.title}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <no-data :no-data="!orders || !orders.length" message="暂无任何订单"></no-data>
      </div>
    </div>
    <div class="text-center">
      <pagination v-if="total != 0" :current-page="orderParam.page"
            :total="total"
            :page-size="orderParam.size"
            @current-change="handleCurrentPageChange"
            layout="total, prev, pager, next, jumper"
          ></pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Orders',
  computed: {
    ...mapState({
      orderTypeMap: state => state.app.orderTypeMap,
      orderStatusMap: state => state.app.orderStatusMap
    })
  },
  data () {
    return {
      total: 0,
      orders: [],
      orderParam: {
        page: 1,
        size: 10
      }
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$get('/api/order/page/user', { params: this.orderParam }).then(res => {
        this.total = (res.data && res.data.total) || 0
        this.orders = (res.data && res.data.records) || []
      })
    },
    handleCurrentPageChange (current) {
      this.orderParam.page = current
      this.handleQuery()
    },
    handleGoPay (order) {
      this.$router.replace({ path: '/o/pay-order', query: { orderNo: order.orderNo } })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  width: 180px;
  height: 90px;
}
.order {
  .order-header {
    display: flex;
    justify-content: space-between;
  }
  .order-items {
    border-bottom: 1px solid #e8e8e8;
  }
  .order-item {
    padding: 15px 0;
  }
}
</style>
