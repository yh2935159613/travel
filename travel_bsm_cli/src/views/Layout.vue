<template>
  <div>
    <Header />
    <Nav />
    <Main />
  </div>
</template>

<script>
import Header from "../components/Header";
import Nav from "../components/Nav";
import Main from "../components/Main";
export default {
  name: "Layout",
  components: { Header, Main, Nav },
  data() {
    return {
      tabPosition: "left",
    };
  },
  methods: {},
};
</script>
<style lang='scss'>
</style>
