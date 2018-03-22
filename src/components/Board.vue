<template>
  <div class="board">
    <v-stage :config='boardConfig'>
      <v-layer ref='layer'>
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
  props: ['tiles'],
  data () {
    return {
      boardConfig: Config.configKonva,
      circleConfig: Config.configCircle
    }
  }
}
</script>

<style scoped>
</style>
