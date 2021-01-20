<template>
  <div
    id="viewer-container"
    class="viewer-container"
    style="background: url('assets/images/bg.jpg');background-size:100% 100%;"
  ></div>
</template>

<script>
export default {
  name: 'Viewer',
  data() {
    return {}
  },
  methods: {
    initViewer() {
      let viewer = new DC.Viewer('viewer-container', {
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true
          }
        }
      }).setOptions({
        showMoon: false,
        showSkyBox: false
      })
      this.$emit('on-viewer-completed', viewer)
    }
  },
  mounted() {
    DC.ready(this.initViewer)
  }
}
</script>

<style lang="scss" scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  //background: url('../../assets/images/bg.jpg');
  background-size: 100% 100%;
}
</style>
