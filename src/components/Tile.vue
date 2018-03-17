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
    nonce: {
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
    }
  },
  data () {
    return {
      selected: false,
      fillColor: this.color,
      size: config.hexWidth
    }
  },
  computed: {
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
    if (!this.provider.context) return

    const ctx = this.provider.context
    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)

    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }

    ctx.lineTo(this.points[0].x, this.points[0].y)
    ctx.fillStyle = this.color
    ctx.stroke()
    ctx.fill()
    return true
  }
}
</script>

<style scoped>
</style>
