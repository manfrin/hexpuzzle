<template>
  <div class="game">
    <div class='col'>
      <div class="row"><Controls /></div>
      <div class="row"><Board :tiles='tiles' /></div>
    </div>
    <div class='col'>
      <div class='row'><Instructions :tiles='hexes' /></div>
    </div>
  </div>
</template>

<script>
import Board from './Board'
import Controls from './Controls'
import Instructions from './Instructions'

export default {
  name: 'Game',
  components: {Board, Controls, Instructions},
  computed: {
    tiles () {
      return this.$store.state.board
    },
    hexes () {
      return this.$store.state.hexes
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
  .col {
    height: 100%
  }
</style>
