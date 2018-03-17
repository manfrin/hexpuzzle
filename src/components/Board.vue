<template>
  <div class="board">
    <BoardCanvas>
      <Tile v-for="tile in tiles"
        :key="tile.id"
        :id="tile.id"
        :nonce="tile.nonce"
        :type="tile.type"
        :color="tile.color"
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
    }
  }
}
</script>

<style scoped>
</style>
