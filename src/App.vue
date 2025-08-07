<template>
  <div class="text text-2xl">
    <VideoPlayer />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello world'
    }
  }
}
</script>

<style scoped lang="less">
.text {
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
