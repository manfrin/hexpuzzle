<template>
  <transition
    @leave='leave'
    :css='false'
    :duration='1000'
  >
    <v-regular-polygon
      ref='hex'
      v-if='isVisible'
      :config='config'
      @mouseover='onHover'
      @mouseout='outHover'
      @click='onClick'
    >
    </v-regular-polygon>
  </transition>
</template>

<script>
import config from '@/board_config.js'
import Konva from 'konva'

export default {
  name: 'Tile',
  props: ['tile'],
  data () {
    return {
      size: config.hexWidth / 2 - 4,
      hover: false
    }
  },
  methods: {
    leave (el, done) {
      // if (this.isVisible) {
      //   let hex = this.$refs.hex.getStage()
      //   let stage = this.$parent.getStage()
      //   let speed = 90
      //   let anim = new Konva.Animation(function (frame) {
      //     let angleDiff = frame.timeDiff * speed / 1000
      //     hex.rotate(angleDiff)
      //   }, stage)

      //   anim.start()
      //   setTimeout(done, 10000)
      // }
    },
    getAdjacent (q, r) {
      return this.getTile(this.x + q, this.y + r)
    },
    getTile (q, r) {
      return this.$store.state.board[this.toTileID(q, r)]
    },
    toTileID (q, r) {
      return `q${q}r${r}`
    },
    onHover () {
      if (this.isUsable) {
        this.hover = true
      }
    },
    outHover () {
      this.hover = false
    },
    onClick () {
      if (this.isUsable) {
        this.$store.dispatch('clicked', this.tile.id)
      }
    }
  },
  computed: {
    hexType () {
      return this.$store.state.hexes[this.tile.type]
    },
    adjacentTiles () {
      return [
        this.getAdjacent(0, -1),
        this.getAdjacent(1, -1),
        this.getAdjacent(1, 0),
        this.getAdjacent(0, 1),
        this.getAdjacent(-1, 1),
        this.getAdjacent(-1, 0)
      ]
    },
    hasThreeEmptyAdjacent () {
      let sequence = new Array(12)
      for (let i = 0; i < 6; i++) {
        if (!this.adjacentTiles[i] || this.adjacentTiles[i].type === 'empty') {
          sequence[i] = 0
          sequence[i + 6] = 0
        } else {
          sequence[i] = 1
          sequence[i + 6] = 1
        }
      }
      return !!sequence.join('').match(/000/)
    },
    isUsable () {
      return (this.tile.type !== 'empty') &&
        this.hasThreeEmptyAdjacent
    },
    config () {
      return {
        x: this.center.x,
        y: this.center.y,
        sides: 6,
        radius: this.size,
        fill: this.hexType.color,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth
      }
    },
    strokeWidth () {
      return this.isUsable ? 4 : 0
    },
    strokeColor () {
      return this.selected ? 'green'
        : this.hover ? 'red'
          : this.isUsable ? 'white'
            : this.hexType.color
    },
    isVisible () {
      return this.tile.type !== 'empty'
    },
    x () {
      return +this.tile.id.match(/^q(-?\d)r(-?\d)/)[1]
    },
    y () {
      return +this.tile.id.match(/^q(-?\d)r(-?\d)/)[2]
    },
    z () {
      return -this.x - this.y
    },
    center () {
      let centerPos = config.boardWidth * config.hexWidth / 2
      let size = config.hexWidth / 2
      let x = size * Math.sqrt(3) * (this.x + this.y / 2) + centerPos
      let y = size * (3 / 2) * this.y + centerPos
      return {x, y}
    },
    selected () {
      return this.$store.state.selected === this.tile.id
    }
  },
  mounted () {
    if (this.selected) {
      let hex = this.$refs.hex.getStage()
      let stage = this.$parent.getStage()
      let speed = 90
      let anim = new Konva.Animation(function (frame) {
        let angleDiff = frame.timeDiff * speed / 1000
        hex.rotate(angleDiff)
        hex.scale(angleDiff, angleDiff)
      }, stage)

      anim.start()
    }
  }
}
</script>
