<template>
  <div class="instruction">
    <div class='display'>
      <v-stage :config='{
        width: 65,
        height: 65
      }'>
        <v-layer ref='layer'>
          <v-regular-polygon
            ref='hex'
            :config='config'
            @mouseover='highlight(tile.type)'
            @mouseout='unhighlight'
          >
          </v-regular-polygon>
        </v-layer>
      </v-stage>

    </div>
    <div class='panel'>
      <!-- <h2>{{this.hexType.name}}</h2> -->
      <v-stage :config='{
        width: 200,
        height: 30
      }'>
        <v-layer>
          <v-regular-polygon
            v-for='(subtile, i) in tile.matches'
            :key='subtile'
            :config='subtileConfig(subtile, i)'
            @mouseover='highlight(subtile)'
            @mouseout='unhighlight'
          />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
import config from '@/board_config.js'

export default {
  name: 'Instruction',
  props: ['tile'],
  data () {
    return {
      size: config.hexWidth / 2 - 4
    }
  },
  methods: {
    highlight (type) {
      this.$store.dispatch('highlightTile', type)
    },
    unhighlight () {
      this.$store.dispatch('unhighlightTile')
    },
    subtileConfig (tile, i) {
      let hexType = this.$store.state.hexes[tile]
      return {
        x: 16 + 30 * i,
        y: 16,
        sides: hexType.sides || 6,
        radius: 10,
        fill: hexType.color,
        opacity: 0.95
      }
    }
  },
  computed: {
    config () {
      return {
        x: config.hexWidth / 2 - 4,
        y: config.hexWidth / 2 - 4,
        sides: this.sides,
        radius: this.size,
        fill: this.hexType.color,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        opacity: 0.95
      }
    },
    hexType () {
      return this.$store.state.hexes[this.tile.type]
    },
    sides () {
      return this.hexType.sides || 6
    }
  }
}
</script>

<style>
.instruction {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

h2 {
  margin: 0
}

.panel {
  margin-top: 10px;
}
</style>
