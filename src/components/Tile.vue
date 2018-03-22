<script>
import config from '@/board_config.js'

export default {
  name: 'Tile',
  inject: ['provider'],
  props: {
    id: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String
    },
    color: {
      required: true,
      type: String
    },
    lastRedrawn: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      selected: false,
      fillColor: this.color,
      size: config.hexWidth - 10
    }
  },
  watch: {
    type () {
      this.clearBoundingSquare()
      this.draw()
      this.$store.dispatch('drewTile', this.id)
    },
    neighborWasRedrawn () {
      console.log('nr')
      this.draw()
    }
  },
  methods: {
    getAdjacent (q, r) {
      return this.getTile(this.x + q, this.y + r)
    },
    getTile (q, r) {
      return this.$store.state.board[this.toTileID(q, r)]
    },
    toTileID (q, r) {
      return `q${q}r${r}`
    },
    drawAdjacent () {
      for (let id in this.adjacentTiles) {
        const tile = this.adjacentTiles[id]
        if (tile) {
          this.$store.dispatch('drawTile', tile.id)
        }
      }
    },
    clearBoundingSquare () {
      if (!this.provider.context) return

      const ctx = this.provider.context
      const startX = this.center.x - (this.size / 2) - 5
      const startY = this.center.y - (this.size / 2) - 5

      ctx.clearRect(startX, startY, this.size + 10, this.size + 10)
    },
    draw () {
      if (!this.provider.context) return

      const ctx = this.provider.context
      ctx.beginPath()

      if (this.type === 'gem') {
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        ctx.lineTo(this.points[0].x, this.points[0].y)
      } else {
        ctx.arc(this.center.x, this.center.y, this.size / 2 - 20, 0, Math.PI * 2)
      }

      ctx.fillStyle = this.color
      // ctx.globalCompositeOperation = 'overlay'
      ctx.fill()

      if (this.isUsable) {
        ctx.lineWidth = 3
        ctx.strokeStyle = '#FFF'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }
    }
  },
  computed: {
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
    neighborIds () {
      return [
        this.toTileID(this.x, this.y - 1),
        this.toTileID(this.x + 1, this.y - 1),
        this.toTileID(this.x + 1, this.y),
        this.toTileID(this.x, this.y + 1),
        this.toTileID(this.x - 1, this.y + 1),
        this.toTileID(this.x - 1, this.y)
      ]
    },
    neighborWasRedrawn () {
      return !!this.neighborIds.join('').match(this.lastRedrawn)
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
      return (this.type === 'gem') &&
        this.hasThreeEmptyAdjacent
    },
    x () {
      return +this.id.match(/^q(-?\d)r(-?\d)/)[1]
    },
    y () {
      return +this.id.match(/^q(-?\d)r(-?\d)/)[2]
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
    canvasSize () {
      return config.boardWidth * config.hexWidth
    },
    positioningOffset () {
      return 200
    },
    points () {
      let points = []
      for (let i = 0; i < 6; i++) {
        let degree = 60 * i
        let radian = Math.PI / 180 * degree
        let px = this.center.x + this.size / 2 * Math.sin(radian)
        let py = this.center.y + this.size / 2 * Math.cos(radian)
        points.push({x: px, y: py})
      }
      return points
    }
  },
  render () {
    console.log('render')
    this.draw()
    return true
  }
}
</script>

<style scoped>
</style>
