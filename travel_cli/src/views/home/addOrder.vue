<template>
  <div>
    <van-nav-bar
      title="新增订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            disabled
            v-model="value.scenicTitle"
            name="scenicPrice"
            label="景点"
            placeholder="景点"
            :rules="[{ required: true, message: '请填写景点' }]"
          />
          <van-field
            disabled
            v-model="value.scenicPrice"
            name="scenicPrice"
            label="单价"
            placeholder="单价"
            :rules="[{ required: true, message: '请填写单价' }]"
          />
          <van-field name="orderQuantity" label="数量">
            <template #input>
              <van-stepper v-model="orderQuantity" />
            </template>
          </van-field>
          <van-field
            v-model="orderPrice"
            disabled
            name="orderPrice"
            label="总价"
            placeholder="总价"
            :rules="[{ required: true, message: '请填写总价' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { Toast } from "vant";
import request from "../../utils/request";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/home");
    };
    const value = JSON.parse(route.query.value);
    const scenicPrice = value.scenicPrice;
    const orderQuantity = ref(1);
    const orderPrice = computed(() => {
      return scenicPrice * orderQuantity.value;
    });
    const onSubmit = (values) => {
      console.log("submit", values);
      values.scenicId = value.scenicId;
      request
        .request({
          method: "post",
          url: "/api/order/addOrder",
          data: values,
        })
        .then((res) => {
        //   console.log(res);
          if (res.data.code == "200") {
            Toast.success(res.data.msg);
            router.push("/home");
          } else {
            Toast.fail(res.data.msg);
          }
        });
    };
    return {
      onClickLeft,
      value,
      scenicPrice,
      orderQuantity,
      orderPrice,
      onSubmit,
    };
  },
};
</script>

<style>
</style>