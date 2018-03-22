<template>
  <div class="game">
    <div class="row"><Controls /></div>
    <div class="row"><Board
      :tiles='tiles'
     /></div>
  </div>
</template>

<script>
import Board from './Board'
import Controls from './Controls'

export default {
  name: 'Game',
  components: {Board, Controls},
  computed: {
    tiles () {
      return this.$store.state.board
    }
  }
}
</script>

<style>
  .game {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .row {
    width: 100%;
    justify-content: center;
    display: flex;
  }
</style>
