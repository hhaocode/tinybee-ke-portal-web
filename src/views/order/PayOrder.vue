<template>
  <div class="cart-wrapper">
    <div v-if="paid">
      <div>
        <div>订单已支付,请再订单中心查看</div>
        <div>
          <button @click="$router.replace('/u/orders')">去订单中心</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="cart-header">
        <div class="cart-header-wrapper">
          <div class="card-title">
            <div>
              <h1>支付中心</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-body">
        <div class="title-box">
          <div class="goods-info-title">订单: {{order.orderNo}}</div>
          <a href="javascript:void(0);" @click="skuDetailVisiable = !skuDetailVisiable">{{skuDetailVisiable ? '收起' : '详情'}}</a>
        </div>
        <div class="detail-box">
          <div class="detail-wrapper">
            <ul v-show="skuDetailVisiable">
              <li class="detail-item" v-for="(orderItem, idx) in order.orderItems" :key="idx" style="background: #f3f5f7;">
                <a :href="`/course/intro/${orderItem.id}`" target="_blank">
                  <img :src="orderItem.coverUrl" :alt="orderItem.title">
                </a>
                <div class="text-info-box">
                  <a :href="`/course/intro/${orderItem.id}`" target="_blank">
                    {{orderItem.title}}
                  </a>
                </div>
                <div class="price-info">
                  ￥{{orderItem.actualPrice | amount}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="title-box">
          <div class="goods-info-title">支付方式</div>
          <a href="javascript:;">其他支付</a>
        </div>
        <div class="detail-box">
          <div class="detail-wrapper">
            <ul class="pay-way clearfix">
              <li class="pay-way-item" :class="{checked: paymentWay === 'ALIPAY'}"  @click="switchPaymentWay('ALIPAY')">
                <div>支付宝</div>
                <div class="bottom-checked-flag">
                  <i class="checked-icon"></i>
                </div>
              </li>
              <li class="pay-way-item"  :class="{checked: paymentWay === 'WX'}" @click="switchPaymentWay('WX')">
                <div>微信</div>
                <div class="bottom-checked-flag">
                  <i class="checked-icon"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-box summary-wrapper">
          <div>应付金额：<span class="summary-amount">￥ {{order.amount | amount}}</span></div>
          <div class="payment-i-btn-wrapper">
            <button class="payment-i-btn" :disabled="paymentDisabled" @click="doSubmitPayment">立即支付</button>
          </div>
          <div>
            <a href="javascript:void(0);" class="__a_info">付款有问题，点我</a>
          </div>
        </div>
      </div>
    </div>
      <div ref="alipayFormWrapper" v-html="alipayForm"></div>
      <t-dialog ref="alipayInfoDialog" :closable="false" width="360px" :visiable.sync="aliPayVisiable" style="box-shadow:0 12px 24px 0 rgba(7,17,27,.2)">
        <div slot="header"></div>
        <div class="alipay-dialog-content">
          <div>
            <div></div>
            <div>等待您完成支付</div>
            <p>请在支付页面继续完成支付</p>
          </div>
          <button>支付完成</button>
          <div>
            <button><span class="fa fa-refresh"></span><span>重新选择支付方式</span></button>
          </div>
        </div>
      </t-dialog>
      <t-dialog ref="wxPayInfoDialog" :closable="false" width="360px" :visiable.sync="wxPayVisiable" style="box-shadow:0 12px 24px 0 rgba(7,17,27,.2)">
        <div slot="header"></div>
        <div class="alipay-dialog-content">
          <div>
            <div>
              <div id="wxPayQrCodeContainer"></div>
            </div>
            <div>等待您完成支付</div>
            <p>请在支付页面继续完成支付</p>
          </div>
          <button>支付完成</button>
          <div>
            <button><span class="fa fa-refresh"></span><span>重新选择支付方式</span></button>
          </div>
        </div>
      </t-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      order: { orderItems: [], orderNo: '', amount: 0 },
      skuDetailVisiable: true,
      paymentWay: 'ALIPAY',
      paymentDisabled: true,
      token: '',
      alipayForm: '',
      aliPayVisiable: false,
      payStatusTimer: null,
      paid: false,
      wxPayVisiable: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    switchPaymentWay (way) {
      this.paymentWay = way
    },
    async initData () {
      const { orderNo } = this.$route.query
      if (!orderNo) {
        this.$message.error('无效订单号')
      }
      await this.$get(`/api/order/getForPay/${orderNo}`).then(res => {
        if (res.code === 0) {
          this.paid = false
          this.order = res.data
          this.paymentDisabled = false
          this.token = res.uuid
        } else {
          // this.paid = true
          this.$message.error(res.message)
        }
      })
    },
    doSubmitPayment () {
      this.$post('/api/order/pay', { token: this.token, orderId: this.order.id, orderNo: this.order.orderNo, paymentWay: this.paymentWay, platform: 'PC', returnUrl: window.location.href }).then(res => {
        if (res.code === 0) {
          if (this.paymentWay === 'ALIPAY') {
            this.alipayForm = res.data.paymentResult
            this.$nextTick(() => {
              const form = this.$refs.alipayFormWrapper.children[0]
              form.setAttribute('target', '_blank')
              form.submit()
              this.alipayForm = ''
              this.aliPayVisiable = true
              // 开启轮询查看订单状态
            })
          } else if (this.paymentWay === 'WX') {
            // 微信支付
            if (this.qrcode) {
              this.qrcode.clear()
              this.qrcode.makeCode(res.data.paymentResult)
            } else {
              this.qrcode = new QRCode('wxPayQrCodeContainer', {
                text: res.data.paymentResult,
                width: 140,
                height: 140,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
              })
              this.wxPayVisiable = true
              // TODO
            }
          }
          this.$message.success('支付成功')
          this.paid = true
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.pay-way {
  .pay-way-item {
    float: left;
    position: relative;
    background-color: #e3e6e9;
    width: 200px;
    height: 80px;
    line-height: 80px;
    padding: auto;
    margin-right: 20px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    // box-sizing: b;
    border: 2px solid transparent;
    &.checked, &:hover {
      border: 2px solid $mainColor;
      .bottom-checked-flag {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        bottom: 0;
        // display: none;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-bottom: 20px solid $mainColor;
          border-left: 20px solid transparent;
        }
        .checked-icon {
          position: absolute;
          z-index: 1;
          bottom: 0;
          right: 0;
          height: 12px;
          width: 12px;
          &::after {
            content: "";
            position: absolute;
            width: 12px;
            height: 2px;
            background-color: #ffffff;
            transform: rotateZ(-60deg);
            left: 2px;
            bottom: 7px;
          }
          &::before {
            content: "";
            position: absolute;
            width: 6px;
            height: 2px;
            background-color: #ffffff;
            transform: rotateZ(40deg);
            left: 0;
            bottom: 3px;
          }
        }
      }
    }
  }
  .pay-way-item:nth-child(5n) {
    margin-right: 0;
  }
}
.summary-wrapper {
  text-align: right;
  padding-top: 30px;
}
.payment-i-btn-wrapper {
  padding: 30px 0;
  .payment-i-btn {
    width: 140px;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background-color: #f01414;
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      background-color: #f04646;
    }
  }
}
.summary-amount {
  color: #f20d0d;
  font-size: 22px;
}
.alipay-dialog-content {
  padding: 30px 0;
  text-align: center;
}
</style>
