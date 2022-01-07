<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-for="(value, index) in order" :key="index">
      <van-card
        :num="value.orderQuantity"
        :price="value.orderPrice"
        desc="描述信息"
        title="商品标题"
      >
        <template #footer>
          <van-button size="mini">删除</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import { Toast } from "vant";
import request from "../../utils/request";
export default {
  setup() {
    const router = useRouter();
    const order = reactive([]);
    const onClickLeft = () => {
      router.push("/info");
    };
    const getAllOrder = () => {
      request
        .request({
          method: "get",
          url: "/api/order/getAllOrder",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            res.data.data.map((value) => {
              request
                .request({
                  method: "get",
                  url: "/api/scenic/getScenic",
                })
                .then((res) => {
                  // console.log(res);
                  if (res.data.code == "200") {
                    res.data.data.map((item) => {
                      // console.log(item);
                      if (value.scenicId == value.scenicId) {
                        value.scenicTitle = item.scenicTitle;
                        value.imgSrc = item.imgSrc;
                        value.introduce = item.introduce;
                      }
                    });
                  }
                });
              console.log(value);
              order.push(value);
            });
          }
        });
      console.log(order);
    };
    getAllOrder();
    return {
      onClickLeft,
      getAllOrder,
      order,
    };
  },
};
</script>

<style>
</style>