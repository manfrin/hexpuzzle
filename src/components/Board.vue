<template>
  <div class="board">
    <v-stage :config='boardConfig'>
      <v-layer>
        <Tile v-for='tile in tiles'
          :key='tile.id'
          :tile='tile'
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import VueKonva from 'vue-konva'
import Vue from 'vue'

import Config from '@/board_config.js'

import Tile from './Tile'

Vue.use(VueKonva)

export default {
  name: 'Board',
  components: {Tile},
  data () {
    return {
      boardConfig: Config.configKonva,
      circleConfig: Config.configCircle
    }
  },
  computed: {
    tiles () {
      return this.$store.state.board
    }
  }
}
</script>

<style scoped>
</style>
