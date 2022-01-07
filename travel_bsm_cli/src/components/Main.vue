<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  position: absolute;
  margin-left: 14%;
  top: 90px;
  width: 1400px;
  height: 700px;
  background-color: rgb(255, 255, 255);
  box-shadow: -5px -5px 5px rgb(214, 214, 214);
}
</style>
