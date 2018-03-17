<template>
  <div class="canvas">
    <canvas
      :width="canvasSize"
      :height="canvasSize"
      style="border:1px solid"
      ref="gameBoard"
    >
    </canvas>
    <slot></slot>
  </div>
</template>

<script>
import config from '@/board_config.js'

export default {
  name: 'BoardCanvas',
  data () {
    return {
      provider: { context: null }
    }
  },
  provide () {
    return {
      provider: this.provider
    }
  },
  computed: {
    canvasSize () {
      return config.boardWidth * config.hexWidth
    }
  },
  mounted () {
    this.provider.context = this.$refs['gameBoard'].getContext('2d')
  }
}
</script>

<style scoped>
</style>
