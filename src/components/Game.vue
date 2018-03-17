<template>
  <div class="game">
    <Controls />
    <Board />
  </div>
</template>

<script>
import Board from './Board'
import Controls from './Controls'

export default {
  name: 'Game',
  components: {Board, Controls}
}
</script>

<style scoped>
</style>
