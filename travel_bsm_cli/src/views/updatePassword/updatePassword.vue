<template>
  <div>
    <div class="container1">
      <h3>修改密码</h3>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      user: JSON.parse(localStorage.getItem("user")),
      password: "",
    };
  },
  methods: {
    onSubmit() {
      const { userId } = this.user;
      request
        .request({
          method: "get",
          url: "/api/user/getAlluser",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == "200") {
            const result = res.data.data;
            // console.log(result);
            result.map((value) => {
              if (value.userId == userId) {
                if (value.password == this.form.oldPassword) {
                  if (this.form.confirmPassword == this.form.password) {
                    console.log(this.form.password);
                    // console.log(userId);
                    request
                      .request({
                        method: "post",
                        url: "/api/user/updatePassword",
                        params: {
                          userId,
                        },
                        data: this.form,
                      })
                      .then((res) => {
                        console.log(res.data);
                        if (res.data.code == "200") {
                          alert(res.data.msg);
                          this.$router.push("/");
                          localStorage.clear();
                        } else {
                          alert("修改失败");
                        }
                      });
                  } else {
                    alert("两次密码不相同");
                  }
                } else {
                  alert("原密码错误");
                }
              }
            });
          }
        });
    },
  },
};
</script>

<style>
.container1 {
  width: 400px;
  height: 500px;
  margin-left: 100px;
  margin-top: 40px;
  border: 2px solid rgb(224, 224, 224);
  box-shadow: 5px 5px 5px rgb(224, 224, 224);
}
h3 {
  margin-left: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>