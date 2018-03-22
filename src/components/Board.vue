<template>
  <div class="board">
    <BoardCanvas>
      <Tile v-for="tile in tiles"
        :key="tile.id"
        :id="tile.id"
        :type="tile.type"
        :color="tile.color"
        :lastRedrawn="lastRedrawn"
      />
    </BoardCanvas>
  </div>
</template>

<script>
import BoardCanvas from './BoardCanvas'
import Tile from './Tile'

export default {
  name: 'Board',
  components: {Tile, BoardCanvas},
  computed: {
    tiles () {
      return this.$store.state.board
    },
    lastRedrawn () {
      return this.$store.state.lastRedrawn
    }
  }
}
</script>

<style scoped>
</style>
