<!--
@file: WaterMask.vue
@createBy: lufei
@description: 水印
 -->
<template>
  <div
    v-if="visible"
    class="water-masks"
    :style="{
      backgroundImage: `url(${imageData})`
    }"
  ></div>
</template>

<script>
export default {
  name: 'WaterMask',
  data() {
    return {
      visible: false,
      imageData: ''
    }
  },
  mounted() {
    this.getImageData()
  },
  unmounted() {
    URL.revokeObjectURL(this.imageData)
  },
  methods: {
    getImageData() {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const padding = [30, 60]
      const userName = this.$NICK_NAME
      const accountId = this.$ACCOUNT_ID
      const canvasWidth =
        Math.max(ctx.measureText(userName).width, ctx.measureText(accountId).width) + padding[1] * 2
      const canvasHeight = padding[0] * 2 + 16 + 20 + 12
      if (this.imageData) {
        return
      }
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      ctx.font = '16px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      if (userName) {
        ctx.rotate(-0.13)
        ctx.fillText(userName, padding[1] - 1, padding[0] + 1)
        ctx.fillStyle = 'rgba(0,0,10,0.05)'
        ctx.fillText(userName, padding[1], padding[0])
      }
      ctx.font = '12px sans-serif'
      if (accountId) {
        ctx.fillText(accountId, padding[1], padding[0] + 16 + 10 + 12)
      }
      // this.imageData = canvas.toDataURL('image/png')
      ctx.restore()
      // ctx.strokeRect(1, 1, canvasWidth - 2, canvasHeight - 2)
      canvas.toBlob((blob) => {
        this.imageData = URL.createObjectURL(blob)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.water-masks {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  // background-color: rgba(255, 255, 0, 0.05);
  background-position: center top;
  pointer-events: none;
  z-index: 3;
}
</style>
