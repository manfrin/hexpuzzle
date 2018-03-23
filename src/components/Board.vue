<template>
  <div class="board">
    <v-stage :config='boardConfig'>
      <v-layer ref='layer'>
        <Tile v-for='tile in tiles'
          :key='tile.id'
          :tile='tile'
        />
        <Win v-if='emptyTileset' />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import VueKonva from 'vue-konva'
import Vue from 'vue'

import Config from '@/board_config.js'

import Tile from './Tile'
import Win from './Win'

Vue.use(VueKonva)

export default {
  name: 'Board',
  components: {Tile, Win},
  props: ['tiles'],
  data () {
    return {
      boardConfig: Config.configKonva,
      circleConfig: Config.configCircle
    }
  },
  computed: {
    emptyTileset () {
      let len = Object.values(this.$store.state.board).filter(function (tile) {
        return tile.type !== 'empty'
      }).length
      return len === 0
    }
  }
}
</script>

<style scoped>
</style>
