<template>
  <v-star
    ref='win'
    :config="{
        x: 280,
        y: 280,
        numPoints: 5,
        innerRadius: 40,
        outerRadius: 70,
        stroke: 'black',
        strokeWidth: 4,
        fillLinearGradientStartPoint: {x: -50, y: -50},
        fillLinearGradientEndPoint: {x: 50, y: 50},
        fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
      }"
  >
  </v-star>
</template>

<script>
export default {
  name: 'Win'
}
