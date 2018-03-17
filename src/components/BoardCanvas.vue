<template>
  <div class="canvas">
    <canvas
      :width="canvasSize"
      :height="canvasSize"
      ref="gameBoard"
    >
    </canvas>
    <slot v-on:clearBoard="clear"></slot>
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
  },
  methods: {
    clear () {
      console.log('clearing')
      this.provider.context.clearRect(0, 0, this.canvasSize, this.canvasSize)
    }
  }
}
</script>

<style scoped>
</style>
